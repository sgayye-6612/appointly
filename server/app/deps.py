"""Who is calling? ("actors")

Appointly has three portals. The demo lets one browser be logged in to more than one portal
at the same time (for example as a client AND as a business owner), so a request may carry
one token per portal:

    Authorization: Bearer <token>   (any portal; what most API clients and /docs use)
    X-Client-Token:   <token>
    X-Business-Token: <token>
    X-Admin-Token:    <token>

Each valid token fills one slot of `Actors`. Every endpoint then checks permissions
against these slots (e.g. "is this the business that owns the booking?").
"""
from dataclasses import dataclass, field

from fastapi import Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from .database import get_db
from .models import User
from .security import read_token


@dataclass
class Actors:
    client: User | None = None
    business: User | None = None
    admin: User | None = None
    invalid: list[str] = field(default_factory=list)  # portals whose token was rejected

    @property
    def any(self) -> bool:
        return bool(self.client or self.business or self.admin)

    def owns_business(self, business_id: str) -> bool:
        return bool(self.admin or (self.business and self.business.business_id == business_id))


def get_actors(
    authorization: str | None = Header(None),
    x_client_token: str | None = Header(None),
    x_business_token: str | None = Header(None),
    x_admin_token: str | None = Header(None),
    db: Session = Depends(get_db),
) -> Actors:
    actors = Actors()
    tokens: list[tuple[str | None, str]] = []
    if authorization and authorization.lower().startswith("bearer "):
        tokens.append((None, authorization[7:].strip()))
    for portal, tok in (("client", x_client_token), ("business", x_business_token), ("admin", x_admin_token)):
        if tok:
            tokens.append((portal, tok.strip()))
    for portal, tok in tokens:
        parsed = read_token(tok)
        user = db.get(User, parsed[0]) if parsed else None
        if not user or user.role != parsed[1] or (portal and portal != user.role):
            actors.invalid.append(portal or "bearer")
            continue
        setattr(actors, user.role, user)
    return actors


def require_login(actors: Actors = Depends(get_actors)) -> Actors:
    if not actors.any:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Please log in.", headers={"WWW-Authenticate": "Bearer"})
    return actors
