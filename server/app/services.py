"""Business rules: who may change what, and the double-booking check.

The REST endpoints and the /api/sync endpoint both go through these functions,
so the rules live in ONE place."""
import re

from sqlalchemy import select
from sqlalchemy.orm import Session

from .deps import Actors
from .models import AppointmentNote, Booking, Business, Category, CategoryRequest, Notification, User

BLOCKING = ("confirmed", "pending")          # statuses that occupy a time slot
STATUSES = {"confirmed", "pending", "cancelled"}
DAY_MS = 86_400_000


class Rejected(Exception):
    """A change we refuse. `status` becomes the HTTP status code."""

    def __init__(self, status: int, detail: str):
        super().__init__(detail)
        self.status, self.detail = status, detail


# ---------------- helpers ----------------

def fmt_phone(digits: str) -> str:
    return f"{digits[:5]} {digits[5:]}" if len(digits) == 10 else digits


def only_digits(phone: str) -> str:
    d = re.sub(r"\D", "", phone or "")
    return d[-10:] if len(d) > 10 else d


def service_of(biz: Business, service_id: str) -> dict | None:
    return next((s for s in biz.data.get("services", []) if s.get("id") == service_id), None)


def business_json(biz: Business) -> dict:
    d = dict(biz.data)
    d.pop("password", None)
    d.pop("login_email", None)
    return d


# ---------------- bookings ----------------

def find_conflict(db: Session, biz: Business, staff_id: str | None, start_ms: int, duration: int,
                  exclude_id: str) -> Booking | None:
    """Another active booking for the same staff member that overlaps this time (incl. buffer)?"""
    if not staff_id:
        return None
    buf = int(biz.data.get("buffer") or 0) * 60_000
    end = start_ms + duration * 60_000
    q = select(Booking).where(
        Booking.business_id == biz.id,
        Booking.staff_id == staff_id,
        Booking.status.in_(BLOCKING),
        Booking.id != exclude_id,
        Booking.start_ms < end + buf,
        Booking.start_ms > start_ms - DAY_MS,  # bookings never last a day; keeps the scan small
    )
    for other in db.scalars(q):
        if other.start_ms + other.duration_min * 60_000 + buf > start_ms:
            return other
    return None


def can_see_booking(actors: Actors, row: Booking) -> bool:
    return actors.owns_business(row.business_id) or bool(actors.client and row.client_id == actors.client.id)


def booking_json(row: Booking, actors: Actors) -> dict:
    """Full details for people allowed to see them. Everyone else only gets what the
    availability calendar needs (which slots are taken), with no customer details."""
    mine = bool(actors.client and row.client_id == actors.client.id)
    if can_see_booking(actors, row):
        d = dict(row.data)
    else:
        d = {k: row.data.get(k) for k in ("id", "biz", "svc", "staff", "branch", "start", "status")}
        d["client"] = {"name": "Booked", "phone": ""}
        d["via"] = ""
        d["private"] = True
    d["mine"] = mine
    d["online"] = row.client_id is not None
    return d


def save_booking(db: Session, actors: Actors, item: dict) -> Booking:
    """Create or update one booking, after checking permissions and the time slot."""
    bid = item.get("id")
    if not isinstance(bid, str) or not (0 < len(bid) <= 40):
        raise Rejected(422, "Booking needs an id.")
    biz = db.get(Business, item.get("biz") or "")
    if not biz:
        raise Rejected(422, "Unknown business.")
    svc = service_of(biz, item.get("svc") or "")
    if not svc:
        raise Rejected(422, "Unknown service for this business.")
    staff = item.get("staff")
    if staff is not None and staff not in {s.get("id") for s in biz.data.get("staff", [])}:
        raise Rejected(422, "Unknown staff member for this business.")
    if item.get("status") not in STATUSES:
        raise Rejected(422, "Status must be confirmed, pending or cancelled.")
    try:
        start_ms = int(item.get("start"))
    except (TypeError, ValueError):
        raise Rejected(422, "Booking needs a start time.")

    data = {k: v for k, v in item.items() if k not in ("mine", "online", "private")}
    row = db.get(Booking, bid)
    if row is None:
        if actors.client and item.get("mine"):
            client_id = actors.client.id  # a client booking for themselves
            c = actors.client
            data["client"] = {"name": c.name, "phone": fmt_phone(c.phone or "")}
        elif actors.owns_business(biz.id):
            client_id = None  # walk-in / phone booking entered by the business
        else:
            raise Rejected(403, "Log in to book.")
        row = Booking(id=bid, business_id=biz.id, client_id=client_id)
        db.add(row)
        changed_slot = True
    else:
        if not can_see_booking(actors, row):
            raise Rejected(403, "You can't change this booking.")
        if row.business_id != biz.id:
            raise Rejected(422, "A booking can't move to another business.")
        if not actors.owns_business(row.business_id):
            data["client"] = row.data.get("client")  # clients can't rename the booking's customer
        changed_slot = (row.start_ms != start_ms or row.staff_id != staff or
                        (row.status not in BLOCKING and item["status"] in BLOCKING))

    duration = int(svc.get("dur") or 30)
    if changed_slot and item["status"] in BLOCKING:
        clash = find_conflict(db, biz, staff, start_ms, duration, exclude_id=bid)
        if clash:
            raise Rejected(409, "Sorry, that time was just booked by someone else. Please pick another slot.")

    row.service_id, row.staff_id, row.start_ms = svc["id"], staff, start_ms
    row.duration_min, row.status, row.via = duration, item["status"], str(item.get("via") or "Appointly")[:40]
    row.data = data
    db.flush()
    return row


# ---------------- businesses ----------------

def apply_business(row: Business, data: dict):
    row.name = str(data.get("name") or row.name or "")[:200]
    row.category = str(data.get("cat") or "")[:50]
    row.subcategory = str(data.get("sub") or "")[:80]
    row.city = str(data.get("city") or "")[:80]
    row.area = str(data.get("area") or "")[:120]
    row.status = str(data.get("status") or "active")[:20]
    row.verified = bool(data.get("verified"))
    try:
        row.rating = float(data.get("rating") or 0)
    except (TypeError, ValueError):
        row.rating = 0
    row.data = data


def save_business(db: Session, actors: Actors, item: dict) -> Business:
    row = db.get(Business, str(item.get("id") or ""))
    if not row:
        raise Rejected(404, "New businesses are created with /api/auth/register-business.")
    if not actors.owns_business(row.id):
        raise Rejected(403, "Only the owner or an admin can change this business.")
    data = {k: v for k, v in item.items() if k not in ("password", "login_email")}
    if not actors.admin:
        data["verified"] = row.verified           # only admins verify
        if row.status == "pending" or data.get("status") not in ("active", "inactive"):
            data["status"] = row.status            # owners can't skip verification
    apply_business(row, data)
    db.flush()
    return row


# ---------------- notifications ----------------

def can_see_notification(actors: Actors, n: Notification) -> bool:
    if n.audience == "admin":
        return bool(actors.admin)
    if n.audience == "client":
        return bool(actors.client and n.user_id == actors.client.id)
    return bool(actors.business and n.business_id == actors.business.business_id) or bool(actors.admin)


def notification_json(n: Notification) -> dict:
    to = "admin" if n.audience == "admin" else "client" if n.audience == "client" else n.business_id
    return {"id": n.id, "to": to, "type": n.type, "title": n.title, "body": n.body, "at": n.created_ms, "read": n.read}


def save_notification(db: Session, actors: Actors, item: dict, client_ids: list[int]) -> Notification | None:
    """New notifications go to: the admin team, a business, or a client.
    A notification "to client" goes to the customer of the booking changed in the same request
    (e.g. a business cancels a booking -> that booking's customer is told)."""
    nid = str(item.get("id") or "")[:60]
    if not nid:
        raise Rejected(422, "Notification needs an id.")
    row = db.get(Notification, nid)
    if row:
        if not can_see_notification(actors, row):
            raise Rejected(403, "Not your notification.")
        row.read = bool(item.get("read"))
        return row
    to = item.get("to")
    n = Notification(id=nid, type=str(item.get("type") or "")[:30], title=str(item.get("title") or "")[:300],
                     body=str(item.get("body") or ""), read=bool(item.get("read")), created_ms=int(item.get("at") or 0))
    if to == "admin":
        n.audience = "admin"
    elif to == "client":
        target = client_ids[0] if client_ids else (actors.client.id if actors.client else None)
        if not target:
            return None  # e.g. a walk-in customer without an account: nobody to notify
        n.audience, n.user_id = "client", target
    elif isinstance(to, str) and db.get(Business, to):
        n.audience, n.business_id = "business", to
    else:
        raise Rejected(422, "Unknown notification recipient.")
    db.add(n)
    db.flush()
    return n


# ---------------- categories ----------------

def save_categories(db: Session, actors: Actors, cats: list[dict]):
    """Admins can edit everything. Businesses can only ADD a category or subcategory (while registering)."""
    if not (actors.admin or actors.business):
        raise Rejected(403, "Only businesses and admins can change categories.")
    existing = {c.id: c for c in db.scalars(select(Category))}
    for pos, c in enumerate(cats):
        cid = str(c.get("id") or "")[:60]
        if not cid:
            continue
        row = existing.get(cid)
        if row is None:
            db.add(Category(id=cid, label=str(c.get("label") or cid)[:120], position=pos, data=c))
        elif actors.admin:
            row.label, row.position, row.data = str(c.get("label") or cid)[:120], pos, c
        else:  # business: keep existing subcategories, add new ones
            have = {s.get("id") for s in row.data.get("subs", [])}
            new_subs = [s for s in c.get("subs", []) if s.get("id") not in have]
            if new_subs:
                row.data = {**row.data, "subs": row.data.get("subs", []) + new_subs}
    if actors.admin:
        keep = {str(c.get("id")) for c in cats}
        for cid, row in existing.items():
            if cid not in keep:
                db.delete(row)


def request_key(r: dict) -> str:
    return f"{r.get('cat')}:{r.get('sub')}:{r.get('at')}"[:200]


def save_category_requests(db: Session, actors: Actors, reqs: list[dict]):
    if not (actors.admin or actors.business):
        raise Rejected(403, "Only businesses and admins can do this.")
    existing = {r.id: r for r in db.scalars(select(CategoryRequest))}
    for pos, r in enumerate(reqs):
        key = request_key(r)
        row = existing.get(key)
        if row is None:
            db.add(CategoryRequest(id=key, status="pending", position=pos, data={**r, "status": "pending"}))
        elif actors.admin:
            row.status, row.position, row.data = str(r.get("status") or "pending")[:20], pos, r


# ---------------- notes on sample appointments ----------------

def business_of_appt(db: Session, appt_id: str) -> str | None:
    if appt_id.startswith("g-"):   # generated sample appointment: "g-<business>-<date>-<staff>-<minute>"
        parts = appt_id.split("-")
        return parts[1] if len(parts) > 2 else None
    b = db.get(Booking, appt_id)
    return b.business_id if b else None


def save_appt_note(db: Session, actors: Actors, appt_id: str, field: str, value: dict | None):
    biz_id = business_of_appt(db, appt_id)
    if not biz_id or not db.get(Business, biz_id):
        raise Rejected(422, "Unknown appointment.")
    if not actors.owns_business(biz_id):
        raise Rejected(403, "Only the business can change its appointments.")
    row = db.get(AppointmentNote, appt_id[:160])
    if row is None:
        row = AppointmentNote(appt_id=appt_id[:160], business_id=biz_id)
        db.add(row)
    setattr(row, field, value)


def client_auth_json(u: User) -> dict:
    return {"name": u.name, "phone": fmt_phone(u.phone or "")}
