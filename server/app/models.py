"""Database tables.

Pattern used everywhere: important fields get their own typed columns (for searching,
filtering, indexes and constraints), and the full object is also kept in a JSON column
(`data`, JSONB in PostgreSQL) for flexible details such as services, staff, opening hours,
FAQs or a reschedule proposal.

Times of bookings are stored as epoch milliseconds (start_ms), the same unit the browser uses.
"""
from datetime import datetime, timezone

from sqlalchemy import JSON, BigInteger, Boolean, DateTime, Float, ForeignKey, Index, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base

JSONType = JSON().with_variant(JSONB(), "postgresql")


def now():
    return datetime.now(timezone.utc)


class Business(Base):
    __tablename__ = "businesses"
    id: Mapped[str] = mapped_column(String(80), primary_key=True)          # e.g. "smilecaredental"
    name: Mapped[str] = mapped_column(String(200))
    category: Mapped[str] = mapped_column(String(50), index=True)          # e.g. "health"
    subcategory: Mapped[str] = mapped_column(String(80), default="", index=True)
    city: Mapped[str] = mapped_column(String(80), default="", index=True)
    area: Mapped[str] = mapped_column(String(120), default="")
    status: Mapped[str] = mapped_column(String(20), default="active", index=True)  # active / pending / inactive
    verified: Mapped[bool] = mapped_column(Boolean, default=False)
    rating: Mapped[float] = mapped_column(Float, default=0)
    data: Mapped[dict] = mapped_column(JSONType)                            # services, staff, hours, offers ...
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now, onupdate=now)


class User(Base):
    """One table for all three portals; `role` says which one."""
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    role: Mapped[str] = mapped_column(String(10), index=True)              # client / business / admin
    name: Mapped[str] = mapped_column(String(120), default="")
    email: Mapped[str | None] = mapped_column(String(255), unique=True, nullable=True)
    phone: Mapped[str | None] = mapped_column(String(20), unique=True, nullable=True)   # clients log in by phone
    password_hash: Mapped[str | None] = mapped_column(String(255), nullable=True)
    business_id: Mapped[str | None] = mapped_column(ForeignKey("businesses.id", ondelete="CASCADE"), nullable=True)
    profile: Mapped[dict] = mapped_column(JSONType, default=dict)          # client settings (city, reminders ...)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)


class Booking(Base):
    __tablename__ = "bookings"
    id: Mapped[str] = mapped_column(String(40), primary_key=True)          # e.g. "APX-7K2Q9M"
    business_id: Mapped[str] = mapped_column(ForeignKey("businesses.id", ondelete="CASCADE"), index=True)
    client_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    service_id: Mapped[str] = mapped_column(String(100))
    staff_id: Mapped[str | None] = mapped_column(String(100), nullable=True)
    start_ms: Mapped[int] = mapped_column(BigInteger, index=True)
    duration_min: Mapped[int] = mapped_column(Integer, default=30)
    status: Mapped[str] = mapped_column(String(20), index=True)            # confirmed / pending / cancelled
    via: Mapped[str] = mapped_column(String(40), default="Appointly")
    data: Mapped[dict] = mapped_column(JSONType)                            # client name/phone, payment, proposal ...
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now, onupdate=now)

    # Fast lookup for the double-booking check: one staff member's bookings around a time.
    __table_args__ = (Index("ix_bookings_staff_time", "business_id", "staff_id", "start_ms"),)


class Notification(Base):
    __tablename__ = "notifications"
    id: Mapped[str] = mapped_column(String(60), primary_key=True)
    audience: Mapped[str] = mapped_column(String(10), index=True)          # client / business / admin
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    business_id: Mapped[str | None] = mapped_column(ForeignKey("businesses.id", ondelete="CASCADE"), nullable=True, index=True)
    type: Mapped[str] = mapped_column(String(30), default="")
    title: Mapped[str] = mapped_column(String(300), default="")
    body: Mapped[str] = mapped_column(Text, default="")
    read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_ms: Mapped[int] = mapped_column(BigInteger, index=True)


class Favorite(Base):
    __tablename__ = "favorites"
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    business_id: Mapped[str] = mapped_column(ForeignKey("businesses.id", ondelete="CASCADE"), primary_key=True)
    position: Mapped[int] = mapped_column(Integer, default=0)


class Review(Base):
    __tablename__ = "reviews"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    business_id: Mapped[str] = mapped_column(ForeignKey("businesses.id", ondelete="CASCADE"), index=True)
    rating: Mapped[int] = mapped_column(Integer)
    text: Mapped[str] = mapped_column(Text, default="")
    created_ms: Mapped[int] = mapped_column(BigInteger)


class Category(Base):
    __tablename__ = "categories"
    id: Mapped[str] = mapped_column(String(60), primary_key=True)          # e.g. "health"
    label: Mapped[str] = mapped_column(String(120))
    position: Mapped[int] = mapped_column(Integer, default=0)
    data: Mapped[dict] = mapped_column(JSONType)                            # icon + subcategories


class CategoryRequest(Base):
    """A business asked for a new subcategory; the admin approves or rejects it."""
    __tablename__ = "category_requests"
    id: Mapped[str] = mapped_column(String(200), primary_key=True)
    status: Mapped[str] = mapped_column(String(20), default="pending")
    position: Mapped[int] = mapped_column(Integer, default=0)
    data: Mapped[dict] = mapped_column(JSONType)


class AppointmentNote(Base):
    """Changes and notes on the sample (generated) appointments shown in demo business calendars:
    status changes (`appt`) and reminder notes (`rem`)."""
    __tablename__ = "appointment_notes"
    appt_id: Mapped[str] = mapped_column(String(160), primary_key=True)
    business_id: Mapped[str] = mapped_column(ForeignKey("businesses.id", ondelete="CASCADE"), index=True)
    appt: Mapped[dict | None] = mapped_column(JSONType, nullable=True)
    rem: Mapped[dict | None] = mapped_column(JSONType, nullable=True)


class Meta(Base):
    """Small key/value table (e.g. which version of the demo data was loaded)."""
    __tablename__ = "meta"
    key: Mapped[str] = mapped_column(String(60), primary_key=True)
    value: Mapped[str] = mapped_column(Text)

