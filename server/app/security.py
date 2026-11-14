"""Passwords (bcrypt hashes) and login tokens (JWT).

The token payload holds the user id ("sub"), the portal ("role") and an expiry ("exp").
It is signed with SECRET_KEY, so it can't be changed without the server noticing."""
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt

from .config import ACCESS_TOKEN_DAYS, SECRET_KEY

ALGORITHM = "HS256"


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, hashed: str | None) -> bool:
    if not hashed:
        return False
    try:
        return bcrypt.checkpw(password.encode(), hashed.encode())
    except ValueError:
        return False


def create_token(user_id: int, role: str) -> str:
    payload = {"sub": str(user_id), "role": role,
               "exp": datetime.now(timezone.utc) + timedelta(days=ACCESS_TOKEN_DAYS)}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def read_token(token: str) -> tuple[int, str] | None:
    try:
        p = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return int(p["sub"]), str(p["role"])
    except (jwt.PyJWTError, KeyError, ValueError):
        return None
