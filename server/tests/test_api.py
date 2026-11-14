"""API tests. Run from the `server` folder:   python -m pytest -v
They use a temporary SQLite database filled with the demo data."""
import os
import tempfile
import time

os.environ.setdefault("DATABASE_URL", "sqlite:///" + os.path.join(tempfile.mkdtemp(), "test.db"))
os.environ["SECRET_KEY"] = "test-secret-key-that-is-long-enough-1234"

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from app.main import app  # noqa: E402

DENTAL = "smilecaredental"


@pytest.fixture(scope="module")
def c():
    with TestClient(app) as client:
        yield client


def client_token(c, phone="9876543210", name=""):
    r = c.post("/api/auth/client", json={"phone": phone, "code": "123456", "name": name})
    assert r.status_code == 200, r.text
    return r.json()["access_token"]


def business_token(c, email="demo.dental@appointly.demo", password="Appointly@123"):
    r = c.post("/api/auth/business", json={"email": email, "password": password})
    assert r.status_code == 200, r.text
    return r.json()["access_token"]


def bearer(t):
    return {"Authorization": "Bearer " + t}


def free_slot(c, hours_ahead=24 * 20):
    """A start time far in the future, on a whole hour, with no demo bookings."""
    t = int(time.time() * 1000) + hours_ahead * 3_600_000
    return t - t % 3_600_000


def test_health_and_seed(c):
    assert c.get("/api/health").json()["status"] == "ok"
    biz = c.get("/api/businesses").json()
    assert len(biz) >= 20
    assert all("password" not in b for b in biz)
    assert c.get(f"/api/businesses/{DENTAL}").json()["name"] == "SmileCare Dental"
    assert len(c.get("/api/businesses?category=health").json()) >= 3


def test_logins(c):
    assert c.post("/api/auth/client", json={"phone": "9876543210", "code": "000000"}).status_code == 401
    assert c.post("/api/auth/business", json={"email": "demo.dental@appointly.demo", "password": "nope"}).status_code == 401
    assert c.post("/api/auth/admin", json={"email": "admin@appointly.demo", "password": "Appointly@Admin", "code": "999999"}).status_code == 401
    r = c.post("/api/auth/admin", json={"email": "admin@appointly.demo", "password": "Appointly@Admin", "code": "123456"})
    assert r.status_code == 200
    me = c.get("/api/auth/me", headers=bearer(client_token(c))).json()
    assert me["client"]["name"] == "Ananya Rao"


def test_demo_business_one_click(c):
    r = c.post("/api/auth/demo-business", json={"business_id": DENTAL})
    assert r.status_code == 200 and r.json()["user"]["id"] == DENTAL


def test_new_client_signup(c):
    r = c.post("/api/auth/client", json={"phone": "+91 90000 11111", "code": "123456", "name": "Sahithi"})
    assert r.json()["new"] is True and r.json()["user"]["name"] == "Sahithi"
    assert c.post("/api/auth/client", json={"phone": "9000011111", "code": "123456"}).json()["new"] is False


def test_guest_sees_no_private_details(c):
    data = c.get("/api/bootstrap").json()
    assert data["auth"]["client"] is None
    assert all(b["client"]["name"] == "Booked" for b in data["db"]["bookings"])
    assert data["db"]["notifs"] == []


def test_book_and_double_booking(c):
    t1 = client_token(c, "9111111111", "Client One")
    t2 = client_token(c, "9222222222", "Client Two")
    biz = c.get(f"/api/businesses/{DENTAL}").json()
    svc, staff = biz["services"][0]["id"], biz["staff"][0]["id"]
    start = free_slot(c)
    r = c.post("/api/bookings", headers=bearer(t1),
               json={"business_id": DENTAL, "service_id": svc, "staff_id": staff, "start_ms": start})
    assert r.status_code == 201, r.text
    assert r.json()["client"]["name"] == "Client One" and r.json()["mine"] is True
    # same staff, same time -> refused
    r2 = c.post("/api/bookings", headers=bearer(t2),
                json={"business_id": DENTAL, "service_id": svc, "staff_id": staff, "start_ms": start})
    assert r2.status_code == 409
    # 5 minutes later still overlaps -> refused
    r3 = c.post("/api/bookings", headers=bearer(t2),
                json={"business_id": DENTAL, "service_id": svc, "staff_id": staff, "start_ms": start + 5 * 60_000})
    assert r3.status_code == 409
    # a different staff member is fine
    r4 = c.post("/api/bookings", headers=bearer(t2),
                json={"business_id": DENTAL, "service_id": svc, "staff_id": biz["staff"][1]["id"], "start_ms": start})
    assert r4.status_code == 201


def test_permissions_on_bookings(c):
    owner = client_token(c, "9333333333", "Owner Client")
    stranger = client_token(c, "9444444444", "Stranger")
    biz = c.get(f"/api/businesses/{DENTAL}").json()
    r = c.post("/api/bookings", headers=bearer(owner), json={
        "business_id": DENTAL, "service_id": biz["services"][0]["id"], "staff_id": biz["staff"][0]["id"],
        "start_ms": free_slot(c, 24 * 25)})
    bid = r.json()["id"]
    assert c.patch(f"/api/bookings/{bid}/status", headers=bearer(stranger), json={"status": "cancelled"}).status_code == 404
    other_biz = business_token(c, "demo.salons@appointly.demo")
    assert c.patch(f"/api/bookings/{bid}/status", headers=bearer(other_biz), json={"status": "cancelled"}).status_code == 404
    # a client can cancel but not confirm their own booking
    assert c.patch(f"/api/bookings/{bid}/status", headers=bearer(owner), json={"status": "confirmed"}).status_code == 403
    # the business that owns it can cancel it, and the client then sees it cancelled
    r = c.patch(f"/api/bookings/{bid}/status", headers=bearer(business_token(c)),
                json={"status": "cancelled", "reason": "Doctor unavailable"})
    assert r.status_code == 200 and r.json()["cancelBy"] == "business"
    mine = c.get("/api/bookings", headers=bearer(owner)).json()
    assert next(k for k in mine if k["id"] == bid)["status"] == "cancelled"


def test_sync_notifications_go_to_the_right_people(c):
    cust = client_token(c, "9555555555", "Notify Me")
    biz = c.get(f"/api/businesses/{DENTAL}").json()
    k = c.post("/api/bookings", headers=bearer(cust), json={
        "business_id": DENTAL, "service_id": biz["services"][0]["id"], "staff_id": biz["staff"][0]["id"],
        "start_ms": free_slot(c, 24 * 30)}).json()
    # the business cancels in the app: booking change + "to client" notification in one sync
    k.update(status="cancelled", cancelBy="business")
    r = c.post("/api/sync", headers={"X-Business-Token": business_token(c)}, json={
        "bookings": [k],
        "notifs": [{"id": "n-test-1", "to": "client", "type": "cancelled", "title": "Cancelled", "body": "", "at": 1, "read": False}]})
    assert r.json()["ok"] is True
    notes = c.get("/api/notifications", headers=bearer(cust)).json()
    assert any(n["id"] == "n-test-1" for n in notes)
    # nobody else gets it
    assert all(n["id"] != "n-test-1" for n in c.get("/api/notifications", headers=bearer(client_token(c))).json())


def test_sync_refuses_changes_to_other_businesses(c):
    t = business_token(c)
    other = c.get("/api/businesses/stylestudiosalon").json()
    other["name"] = "Hacked"
    r = c.post("/api/sync", headers={"X-Business-Token": t}, json={"businesses": [other]}).json()
    assert r["ok"] is False and r["rejected"][0]["status"] == 403
    assert c.get("/api/businesses/stylestudiosalon").json()["name"] != "Hacked"
    # but the owner can edit their own business
    mine = c.get(f"/api/businesses/{DENTAL}").json()
    mine["about"] = "Updated about text"
    mine["verified"] = False  # owners can't change verification
    assert c.post("/api/sync", headers={"X-Business-Token": t}, json={"businesses": [mine]}).json()["ok"] is True
    after = c.get(f"/api/businesses/{DENTAL}").json()
    assert after["about"] == "Updated about text" and after["verified"] is True


def test_register_business(c):
    biz = {"id": "testyogaplace", "name": "Test Yoga Place", "cat": "fitness", "sub": "yoga", "city": "Hyderabad",
           "area": "Kondapur", "status": "active", "email": "owner@testyoga.in", "password": "should-not-be-stored",
           "staff": [{"id": "testyogaplaces0", "name": "Asha", "days": [1, 2, 3, 4, 5]}],
           "services": [{"id": "testyogaplacev0", "name": "Group class", "dur": 60, "price": 300}]}
    r = c.post("/api/auth/register-business", json={"business": biz, "email": "owner@testyoga.in",
                                                     "password": "Secret@123", "owner": "Asha"})
    assert r.status_code == 201, r.text
    assert "password" not in c.get("/api/businesses/testyogaplace").json()
    assert c.post("/api/auth/register-business", json={"business": {**biz, "id": "other"}, "email": "owner@testyoga.in",
                                                        "password": "Secret@123", "owner": "Asha"}).status_code == 409
    assert business_token(c, "owner@testyoga.in", "Secret@123")


def test_favourites_profile_reviews(c):
    t = client_token(c, "9666666666", "Fav Person")
    h = {"X-Client-Token": t}
    r = c.post("/api/sync", headers=h, json={"favs": [DENTAL, "zenyogastudio"], "profile": {"city": "Hyderabad", "area": "Kukatpally"},
                                              "myReviews": [{"biz": DENTAL, "r": 5, "text": "Great", "at": 123}], "clientName": "Fav P"})
    assert r.json()["ok"]
    db = c.get("/api/bootstrap", headers=h).json()
    assert db["db"]["favs"] == [DENTAL, "zenyogastudio"]
    assert db["db"]["profile"]["area"] == "Kukatpally"
    assert db["db"]["myReviews"][0]["text"] == "Great"
    assert db["auth"]["client"]["name"] == "Fav P"


def test_admin_stats(c):
    assert c.get("/api/admin/stats").status_code == 403
    t = c.post("/api/auth/admin", json={"email": "admin@appointly.demo", "password": "Appointly@Admin", "code": "123456"}).json()["access_token"]
    s = c.get("/api/admin/stats", headers=bearer(t)).json()
    assert s["businesses"] >= 25 and s["bookings"] >= 20


def test_app_page_switches_on_api_mode(c):
    r = c.get("/")
    assert "js/api.js" in r.text and "APPOINTLY_API" in r.text
    assert c.get("/js/app.js").status_code == 200 and c.get("/css/styles.css").status_code == 200
