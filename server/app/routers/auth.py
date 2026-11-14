"""Logins for the three portals.

Client:    mobile number + one-time code   (POST /api/auth/client)
Business:  email + password                (POST /api/auth/business, /api/auth/register-business)
Admin:     email + password + 2FA code     (POST /api/auth/admin)

Sending real SMS codes or using an authenticator app is out of scope for this project,
so the one-time code is a fixed demo value (DEMO_OTP, default 123456)."""
import hmac
import re

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..config import DEMO_LOGINS, DEMO_OTP
from ..database import get_db
from ..deps import Actors, require_login
from ..models import Business, User
from ..security import create_token, hash_password, verify_password
from ..services import apply_business, business_json, client_auth_json, only_digits

router = APIRouter(prefix="/api/auth", tags=["Auth"])

DEFAULT_PROFILE = {"email": "", "city": "Hyderabad", "area": "", "lang": "English",
                   "wa": True, "sms": True, "em": False, "r24": True, "r2": True}


class ClientLogin(BaseModel):
    phone: str = Field(min_length=10, max_length=20)
    code: str = Field(min_length=4, max_length=8)
    name: str = Field("", max_length=120)


class BusinessLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class AdminLogin(BusinessLogin):
    code: str = Field(min_length=4, max_length=8)


class RegisterBusiness(BaseModel):
    business: dict
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    owner: str = Field(min_length=1, max_length=120)


def _code_ok(code: str) -> bool:
    return hmac.compare_digest(code.strip().encode(), DEMO_OTP.encode())


def _wrong():
    raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Email or password is incorrect.")


@router.post("/client", summary="Client login / sign-up with mobile number + code")
def client_login(body: ClientLogin, db: Session = Depends(get_db)):
    phone = only_digits(body.phone)
    if len(phone) != 10:
        raise HTTPException(422, "Enter a 10-digit mobile number.")
    if not _code_ok(body.code):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "That code is not right. Check the message and try again.")
    user = db.scalar(select(User).where(User.phone == phone, User.role == "client"))
    created = user is None
    if created:  # first login = sign-up
        user = User(role="client", phone=phone, name=body.name.strip() or "Guest", profile=dict(DEFAULT_PROFILE))
        db.add(user)
        db.commit()
    return {"access_token": create_token(user.id, "client"), "token_type": "bearer", "new": created,
            "user": client_auth_json(user)}


@router.post("/business", summary="Business owner login")
def business_login(body: BusinessLogin, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(func.lower(User.email) == body.email.lower(), User.role == "business"))
    if not user or not verify_password(body.password, user.password_hash):
        _wrong()
    return {"access_token": create_token(user.id, "business"), "token_type": "bearer",
            "user": {"id": user.business_id, "name": user.name, "role": "Owner"}}


class DemoLogin(BaseModel):
    business_id: str = Field(min_length=1, max_length=80)


@router.post("/demo-business", summary="One-click login to a DEMO business (for trying the app)")
def demo_business_login(body: DemoLogin, db: Session = Depends(get_db)):
    biz = db.get(Business, body.business_id)
    if not DEMO_LOGINS or not biz or not biz.data.get("demo"):
        raise HTTPException(status.HTTP_403_FORBIDDEN, "One-click login only works for demo businesses.")
    user = db.scalar(select(User).where(User.business_id == biz.id, User.role == "business"))
    if not user:
        raise HTTPException(404, "No login for this business.")
    return {"access_token": create_token(user.id, "business"), "token_type": "bearer",
            "user": {"id": biz.id, "name": user.name, "role": "Owner"}}


@router.post("/register-business", status_code=status.HTTP_201_CREATED, summary="Register a new business + owner login")
def register_business(body: RegisterBusiness, db: Session = Depends(get_db)):
    email = body.email.lower()
    if db.scalar(select(User).where(func.lower(User.email) == email)):
        raise HTTPException(status.HTTP_409_CONFLICT, "That email already has a business account.")
    b = {k: v for k, v in body.business.items() if k not in ("password", "login_email")}
    base = re.sub(r"[^a-z0-9]", "", str(b.get("id") or b.get("name") or "").lower())[:60] or "biz"
    bid = base
    while db.get(Business, bid):  # make the id unique
        bid += "x"
    if bid != b.get("id"):
        raise HTTPException(status.HTTP_409_CONFLICT, "That business id is taken. Try again.")
    if not b.get("name") or not b.get("services"):
        raise HTTPException(422, "A business needs a name and at least one service.")
    b["verified"] = False
    if b.get("status") not in ("active", "pending"):
        b["status"] = "pending"
    row = Business(id=bid)
    apply_business(row, b)
    db.add(row)
    db.flush()
    user = User(role="business", name=body.owner.strip(), email=email, password_hash=hash_password(body.password),
                business_id=bid)
    db.add(user)
    db.commit()
    return {"access_token": create_token(user.id, "business"), "token_type": "bearer",
            "user": {"id": bid, "name": user.name, "role": "Owner"}, "business": business_json(row)}


@router.post("/admin", summary="Admin login (password + 2FA code)")
def admin_login(body: AdminLogin, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(func.lower(User.email) == body.email.lower(), User.role == "admin"))
    if not user or not verify_password(body.password, user.password_hash) or not _code_ok(body.code):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Password or authenticator code is incorrect.")
    return {"access_token": create_token(user.id, "admin"), "token_type": "bearer", "user": {"email": user.email}}


@router.get("/me", summary="Who am I (for each token sent)")
def me(actors: Actors = Depends(require_login)):
    out = {}
    if actors.client:
        out["client"] = client_auth_json(actors.client)
    if actors.business:
        out["business"] = {"id": actors.business.business_id, "name": actors.business.name, "role": "Owner"}
    if actors.admin:
        out["admin"] = {"email": actors.admin.email}
    return out
