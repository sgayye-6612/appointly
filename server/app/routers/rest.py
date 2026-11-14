"""Classic REST endpoints (businesses, bookings, notifications, admin stats).

The web app mostly uses /api/bootstrap and /api/sync, but these are the endpoints you would
give to a mobile app or another team, and they're easy to try at /docs."""
import random
import string
import time

from fastapi import APIRouter, Body, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import Actors, get_actors, require_login
from ..models import Booking, Business, Notification, User
from ..services import (STATUSES, Rejected, booking_json, business_json, can_see_booking, can_see_notification,
                        notification_json, save_booking)

router = APIRouter(prefix="/api")


def _raise(e: Rejected):
    raise HTTPException(e.status, e.detail)


# ---------------- businesses ----------------

@router.get("/businesses", tags=["Businesses"], summary="Search businesses")
def list_businesses(category: str | None = None, city: str | None = None,
                    q: str | None = Query(None, description="Search in the name"),
                    db: Session = Depends(get_db)):
    query = select(Business).where(Business.status == "active")
    if category:
        query = query.where(Business.category == category)
    if city:
        query = query.where(func.lower(Business.city) == city.lower())
    if q:
        query = query.where(func.lower(Business.name).contains(q.lower()))
    return [business_json(b) for b in db.scalars(query.order_by(Business.rating.desc()))]


@router.get("/businesses/{business_id}", tags=["Businesses"])
def get_business(business_id: str, db: Session = Depends(get_db)):
    b = db.get(Business, business_id)
    if not b:
        raise HTTPException(404, "Business not found.")
    return business_json(b)


# ---------------- bookings ----------------

class NewBooking(BaseModel):
    business_id: str
    service_id: str
    staff_id: str | None = None
    start_ms: int = Field(description="Start time in milliseconds since 1970 (UTC)")
    via: str = "Appointly"
    pay: str = "Pay at venue"


class StatusChange(BaseModel):
    status: str = Field(description="confirmed, pending or cancelled")
    reason: str = ""


@router.get("/bookings", tags=["Bookings"], summary="My bookings (client) / my business's bookings / all (admin)")
def list_bookings(status_: str | None = Query(None, alias="status"), actors: Actors = Depends(require_login),
                  db: Session = Depends(get_db)):
    q = select(Booking)
    if not actors.admin:
        conds = []
        if actors.client:
            conds.append(Booking.client_id == actors.client.id)
        if actors.business:
            conds.append(Booking.business_id == actors.business.business_id)
        q = q.where(or_(*conds))
    if status_:
        q = q.where(Booking.status == status_)
    return [booking_json(b, actors) for b in db.scalars(q.order_by(Booking.start_ms))]


@router.post("/bookings", tags=["Bookings"], status_code=status.HTTP_201_CREATED,
             summary="Book an appointment (409 if the slot is taken)")
def create_booking(body: NewBooking, actors: Actors = Depends(require_login), db: Session = Depends(get_db)):
    biz = db.get(Business, body.business_id)
    if not biz or biz.status != "active":
        raise HTTPException(404, "Business not found or not taking bookings.")
    if body.start_ms < time.time() * 1000:
        raise HTTPException(422, "Pick a time in the future.")
    bid = "APX-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    item = {"id": bid, "biz": biz.id, "svc": body.service_id, "staff": body.staff_id, "branch": None,
            "start": body.start_ms, "status": "confirmed" if biz.data.get("autoConfirm") else "pending",
            "via": body.via, "pay": body.pay, "mine": bool(actors.client),
            "client": {"name": "Walk-in", "phone": ""}, "created": int(time.time() * 1000)}
    try:
        row = save_booking(db, actors, item)
    except Rejected as e:
        _raise(e)
    db.commit()
    return booking_json(row, actors)


@router.patch("/bookings/{booking_id}/status", tags=["Bookings"], summary="Confirm or cancel a booking")
def change_status(booking_id: str, body: StatusChange, actors: Actors = Depends(require_login),
                  db: Session = Depends(get_db)):
    if body.status not in STATUSES:
        raise HTTPException(422, "Status must be confirmed, pending or cancelled.")
    row = db.get(Booking, booking_id)
    if not row or not can_see_booking(actors, row):
        raise HTTPException(404, "Booking not found.")
    is_owner = actors.owns_business(row.business_id)
    if not is_owner and body.status != "cancelled":
        raise HTTPException(403, "Customers can only cancel.")
    item = {**row.data, "status": body.status}
    if body.status == "cancelled":
        item["cancelBy"] = "business" if is_owner else "client"
        if body.reason:
            item["cancelReason"] = body.reason
    try:
        row = save_booking(db, actors, item)
    except Rejected as e:
        _raise(e)
    db.commit()
    return booking_json(row, actors)


# ---------------- notifications ----------------

@router.get("/notifications", tags=["Notifications"])
def list_notifications(actors: Actors = Depends(require_login), db: Session = Depends(get_db)):
    rows = db.scalars(select(Notification).order_by(Notification.created_ms.desc()))
    return [notification_json(n) for n in rows if can_see_notification(actors, n)]


@router.post("/notifications/{notif_id}/read", tags=["Notifications"], status_code=status.HTTP_204_NO_CONTENT)
def mark_read(notif_id: str, actors: Actors = Depends(require_login), db: Session = Depends(get_db)):
    n = db.get(Notification, notif_id)
    if not n or not can_see_notification(actors, n):
        raise HTTPException(404, "Not found.")
    n.read = True
    db.commit()


# ---------------- admin ----------------

@router.get("/admin/stats", tags=["Admin"], summary="Platform numbers for the admin dashboard")
def stats(actors: Actors = Depends(get_actors), db: Session = Depends(get_db)):
    if not actors.admin:
        raise HTTPException(403, "Admins only.")
    count = lambda q: db.scalar(select(func.count()).select_from(q.subquery()))  # noqa: E731
    by_status = dict(db.execute(select(Booking.status, func.count()).group_by(Booking.status)).all())
    return {
        "businesses": count(select(Business)),
        "active_businesses": count(select(Business).where(Business.status == "active")),
        "clients": count(select(User).where(User.role == "client")),
        "bookings": count(select(Booking)),
        "bookings_by_status": by_status,
    }
