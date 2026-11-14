"""The two endpoints the Appointly web app uses all the time.

GET  /api/bootstrap   Everything the app needs on load, filtered by who is logged in.
POST /api/sync        The app sends only what CHANGED (new booking, cancelled booking,
                      edited business, notification marked read ...). Every change is checked
                      on its own; refused changes are listed in the reply and the rest is saved.
"""
from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import Actors, get_actors
from ..models import (AppointmentNote, Booking, Business, Category, CategoryRequest, Favorite, Notification,
                      Review)
from ..services import (Rejected, booking_json, business_json, can_see_notification, client_auth_json,
                        notification_json, save_appt_note, save_booking, save_business, save_categories,
                        save_category_requests, save_notification)

router = APIRouter(prefix="/api", tags=["App"])


def build_db(db: Session, actors: Actors) -> dict:
    """The app's in-memory database, shaped the way the frontend expects it."""
    notes = list(db.scalars(select(AppointmentNote)))
    out = {
        "ver": 4,
        "cats": [c.data for c in db.scalars(select(Category).order_by(Category.position))],
        "catReq": [r.data for r in db.scalars(select(CategoryRequest).order_by(CategoryRequest.position))],
        "biz": {},
        # status changes on sample appointments are public (they free or block slots) ...
        "appt": {n.appt_id: n.appt for n in notes if n.appt},
        # ... but reminder notes are private to the business
        "rem": {n.appt_id: n.rem for n in notes if n.rem and actors.owns_business(n.business_id)},
        "bookings": [booking_json(b, actors) for b in db.scalars(select(Booking).order_by(Booking.start_ms))],
        "notifs": [notification_json(n) for n in db.scalars(select(Notification).order_by(Notification.created_ms.desc()))
                   if can_see_notification(actors, n)],
        "favs": [], "myReviews": [], "profile": {},
    }
    if actors.client:
        c = actors.client
        out["favs"] = [f.business_id for f in db.scalars(
            select(Favorite).where(Favorite.user_id == c.id).order_by(Favorite.position))]
        out["myReviews"] = [{"biz": r.business_id, "r": r.rating, "text": r.text, "at": r.created_ms}
                            for r in db.scalars(select(Review).where(Review.user_id == c.id).order_by(Review.created_ms.desc()))]
        out["profile"] = dict(c.profile or {})
    return out


@router.get("/bootstrap", summary="Everything the app needs on load")
def bootstrap(actors: Actors = Depends(get_actors), db: Session = Depends(get_db)):
    auth = {"client": None, "business": None, "admin": None}
    if actors.client:
        auth["client"] = client_auth_json(actors.client)
    if actors.business:
        auth["business"] = {"id": actors.business.business_id, "name": actors.business.name, "role": "Owner"}
    if actors.admin:
        auth["admin"] = {"email": actors.admin.email}
    businesses = [business_json(b) for b in db.scalars(select(Business).order_by(Business.created_at, Business.id))]
    return {"db": build_db(db, actors), "businesses": businesses, "auth": auth, "invalid": actors.invalid}


class SyncIn(BaseModel):
    bookings: list[dict] = Field(default_factory=list)
    businesses: list[dict] = Field(default_factory=list)
    notifs: list[dict] = Field(default_factory=list)
    cats: list[dict] | None = None
    catReq: list[dict] | None = None
    appt: dict[str, Any] = Field(default_factory=dict)
    rem: dict[str, Any] = Field(default_factory=dict)
    favs: list[str] | None = None
    profile: dict | None = None
    myReviews: list[dict] | None = None
    clientName: str | None = Field(None, max_length=120)


@router.post("/sync", summary="Save what changed in the app")
def sync(body: SyncIn, actors: Actors = Depends(get_actors), db: Session = Depends(get_db)):
    rejected: list[dict] = []

    def attempt(kind: str, key: str, fn):
        # SAVEPOINT: if this one change is refused, only it is undone.
        sp = db.begin_nested()
        try:
            result = fn()
            sp.commit()
            return result
        except Rejected as e:
            sp.rollback()
            rejected.append({"kind": kind, "id": key, "status": e.status, "detail": e.detail})

    for b in body.businesses:
        attempt("business", str(b.get("id")), lambda b=b: save_business(db, actors, b))
    if body.cats is not None:
        attempt("cats", "cats", lambda: save_categories(db, actors, body.cats))
    if body.catReq is not None:
        attempt("catReq", "catReq", lambda: save_category_requests(db, actors, body.catReq))

    client_ids: list[int] = []  # customers of the bookings changed now (used to address notifications)
    for k in body.bookings:
        row = attempt("booking", str(k.get("id")), lambda k=k: save_booking(db, actors, k))
        if row is not None and row.client_id and row.client_id not in client_ids:
            client_ids.append(row.client_id)
    for n in body.notifs:
        attempt("notif", str(n.get("id")), lambda n=n: save_notification(db, actors, n, client_ids))
    for field, items in (("appt", body.appt), ("rem", body.rem)):
        for appt_id, value in items.items():
            attempt(field, appt_id, lambda a=appt_id, v=value, f=field: save_appt_note(db, actors, a, f, v))

    c = actors.client
    if c:
        if body.favs is not None:
            db.query(Favorite).filter(Favorite.user_id == c.id).delete()
            for pos, biz_id in enumerate(dict.fromkeys(body.favs)):
                if db.get(Business, biz_id):
                    db.add(Favorite(user_id=c.id, business_id=biz_id, position=pos))
        if body.profile is not None:
            c.profile = body.profile
        if body.clientName and body.clientName.strip():
            c.name = body.clientName.strip()
        if body.myReviews is not None:
            have = {(r.business_id, r.created_ms) for r in db.scalars(select(Review).where(Review.user_id == c.id))}
            for r in body.myReviews:
                key = (r.get("biz"), int(r.get("at") or 0))
                if key not in have and db.get(Business, key[0]):
                    db.add(Review(user_id=c.id, business_id=key[0], rating=max(1, min(5, int(r.get("r") or 5))),
                                  text=str(r.get("text") or "")[:2000], created_ms=key[1]))
    elif any(x is not None for x in (body.favs, body.profile, body.myReviews)):
        rejected.append({"kind": "client", "id": "me", "status": 401, "detail": "Log in as a client."})

    db.commit()
    return {"ok": not rejected, "rejected": rejected}
