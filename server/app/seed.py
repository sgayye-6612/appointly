"""Loads the demo data (seed_data.json) into an EMPTY database.

- 25 demo businesses, each with a business login (its email + the demo password)
- 1 admin login
- 1 demo client (Ananya Rao, phone 98765 43210) with sample bookings, notifications,
  favourites and reviews
Dates in the file are moved forward to today, so "tomorrow's booking" is always tomorrow.
"""
import json
import logging
import time
from pathlib import Path

from sqlalchemy import select
from sqlalchemy.orm import Session

from .config import ADMIN_EMAIL, ADMIN_PASSWORD, DEMO_BUSINESS_PASSWORD
from .models import (Booking, Business, Category, CategoryRequest, Favorite, Meta, Notification, Review, User)
from .security import hash_password
from .services import apply_business, only_digits, request_key, service_of

log = logging.getLogger("appointly")
SEED_FILE = Path(__file__).with_name("seed_data.json")
DAY_MS = 86_400_000
TIME_KEYS = ("start", "created", "at")


def _shift(obj, delta: int):
    """Move every timestamp (start / created / at) forward by `delta` milliseconds."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in TIME_KEYS and isinstance(v, (int, float)) and v > 1e12:
                obj[k] = int(v + delta)
            else:
                _shift(v, delta)
    elif isinstance(obj, list):
        for v in obj:
            _shift(v, delta)


def seed_if_empty(db: Session) -> bool:
    if db.scalar(select(Business).limit(1)) is not None:
        return False
    data = json.loads(SEED_FILE.read_text(encoding="utf-8"))
    delta = round((time.time() * 1000 - data["exportedAt"]) / DAY_MS) * DAY_MS  # whole days only
    _shift(data, delta)

    # Businesses + one owner login each (they share the demo password, hashed once)
    demo_hash = hash_password(DEMO_BUSINESS_PASSWORD)
    for b in data["businesses"]:
        email = b.pop("login_email", "") or b.get("email", "")
        row = Business(id=b["id"])
        apply_business(row, b)
        db.add(row)
        db.add(User(role="business", name=b.get("owner") or b["name"], email=email.lower(),
                    password_hash=demo_hash, business_id=b["id"]))
    db.flush()

    db.add(User(role="admin", name="Appointly Admin", email=ADMIN_EMAIL, password_hash=hash_password(ADMIN_PASSWORD)))

    dc = data["demoClient"]
    client = User(role="client", name=dc["name"], phone=only_digits(dc["phone"]), profile=data["profile"])
    db.add(client)
    db.flush()

    for pos, c in enumerate(data["categories"]):
        db.add(Category(id=c["id"], label=c["label"], position=pos, data=c))
    for pos, r in enumerate(data["categoryRequests"]):
        db.add(CategoryRequest(id=request_key(r), status=r.get("status", "pending"), position=pos, data=r))

    by_id = {b["id"]: b for b in data["businesses"]}
    for k in data["bookings"]:
        biz = db.get(Business, k["biz"])
        svc = service_of(biz, k["svc"]) or {}
        k = {key: v for key, v in k.items() if key not in ("mine", "online")}
        db.add(Booking(id=k["id"], business_id=k["biz"], client_id=client.id, service_id=k["svc"],
                       staff_id=k.get("staff"), start_ms=k["start"], duration_min=int(svc.get("dur") or 30),
                       status=k["status"], via=k.get("via") or "Appointly", data=k))

    for n in data["notifications"]:
        to = n["to"]
        db.add(Notification(id=n["id"], type=n.get("type", ""), title=n.get("title", ""), body=n.get("body", ""),
                            read=bool(n.get("read")), created_ms=n["at"],
                            audience="client" if to == "client" else "admin" if to == "admin" else "business",
                            user_id=client.id if to == "client" else None,
                            business_id=to if to in by_id else None))
    for pos, biz_id in enumerate(data["favorites"]):
        db.add(Favorite(user_id=client.id, business_id=biz_id, position=pos))
    for r in data["reviews"]:
        db.add(Review(user_id=client.id, business_id=r["biz"], rating=r["r"], text=r.get("text", ""), created_ms=r["at"]))

    db.add(Meta(key="seeded_at", value=str(int(time.time()))))
    db.commit()
    log.info("Loaded demo data: %d businesses, %d bookings", len(data["businesses"]), len(data["bookings"]))
    return True
