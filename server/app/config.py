"""All settings in one place. Values come from the .env file or the environment."""
import os
from pathlib import Path

from dotenv import load_dotenv

SERVER_DIR = Path(__file__).resolve().parent.parent  # .../server
ROOT_DIR = SERVER_DIR.parent                          # .../appointly (index.html, css, js, assets)

for f in (ROOT_DIR / ".env", SERVER_DIR / ".env", ROOT_DIR / ".env.txt", SERVER_DIR / ".env.txt"):
    if f.is_file():
        load_dotenv(f)


def env(name: str, default: str = "") -> str:
    return os.getenv(name, default).strip().strip('"').strip("'")


# PostgreSQL in production; a local SQLite file if DATABASE_URL is empty (handy on a laptop).
DATABASE_URL = env("DATABASE_URL") or f"sqlite:///{SERVER_DIR / 'appointly.db'}"
# Use the psycopg (v3) driver for PostgreSQL. Render gives "postgres://..." URLs, so fix those too.
for prefix in ("postgres://", "postgresql://"):
    if DATABASE_URL.startswith(prefix):
        DATABASE_URL = "postgresql+psycopg://" + DATABASE_URL[len(prefix):]

SECRET_KEY = env("SECRET_KEY") or "dev-only-secret-change-me-please-32-chars-min"
ACCESS_TOKEN_DAYS = int(env("ACCESS_TOKEN_DAYS", "7"))
CORS_ORIGINS = [o.strip() for o in env("CORS_ORIGINS", "http://localhost:5173").split(",") if o.strip()]

# Load the 25 demo businesses and sample bookings on first start.
SEED_DEMO_DATA = env("SEED_DEMO_DATA", "true").lower() in ("1", "true", "yes")

# Demo logins. Real SMS / authenticator apps are out of scope, so the one-time code is fixed.
DEMO_OTP = env("DEMO_OTP", "123456")
DEMO_LOGINS = env("DEMO_LOGINS", "true").lower() in ("1", "true", "yes")  # one-click demo business logins
DEMO_BUSINESS_PASSWORD = env("DEMO_BUSINESS_PASSWORD", "Appointly@123")
ADMIN_EMAIL = env("ADMIN_EMAIL", "admin@appointly.demo").lower()
ADMIN_PASSWORD = env("ADMIN_PASSWORD", "Appointly@Admin")
