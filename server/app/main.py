"""Appointly API server.

Run (from inside the `server` folder):   uvicorn app.main:app --reload
Then open http://localhost:8000          (the app: client, business and admin portals)
      and http://localhost:8000/docs     (all API endpoints)
"""
import logging
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from sqlalchemy.orm import Session

from .config import CORS_ORIGINS, DATABASE_URL, ROOT_DIR, SEED_DEMO_DATA
from .database import Base, SessionLocal, engine, get_db
from .routers import app_data, auth, rest
from .seed import seed_if_empty

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
log = logging.getLogger("appointly")


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(engine)
    if SEED_DEMO_DATA:
        with SessionLocal() as db:
            seed_if_empty(db)
    log.info("Database: %s", DATABASE_URL.split("@")[-1])  # never print the password
    yield


app = FastAPI(
    title="Appointly API",
    description="Multi-industry appointment booking: client, business and admin portals, "
                "bookings with double-booking protection, notifications and more.",
    version="1.0.0",
    lifespan=lifespan,
)
app.add_middleware(CORSMiddleware, allow_origins=CORS_ORIGINS, allow_credentials=True,
                   allow_methods=["*"], allow_headers=["*"])


@app.get("/api/health", tags=["System"])
def health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"status": "ok", "database": engine.dialect.name}


app.include_router(auth.router)
app.include_router(app_data.router)
app.include_router(rest.router)


@app.get("/", include_in_schema=False)
@app.get("/index.html", include_in_schema=False)
def index():
    # The same index.html also runs alone (GitHub Pages, data in the browser).
    # Served from here, it switches to "API mode": real logins and the database.
    html = (ROOT_DIR / "index.html").read_text(encoding="utf-8")
    html = html.replace('<script src="js/app.js"></script>',
                        '<script>window.APPOINTLY_API=true</script>\n<script src="js/api.js"></script>', 1)
    return HTMLResponse(html, headers={"Cache-Control": "no-cache"})


for folder in ("css", "js", "assets", "screenshots"):
    if (ROOT_DIR / folder).is_dir():
        app.mount(f"/{folder}", StaticFiles(directory=ROOT_DIR / folder), name=folder)
