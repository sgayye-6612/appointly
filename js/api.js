/* Appointly – connects the app to the FastAPI server ("API mode").

   Loaded instead of app.js when the page is served by the Appointly server:
   1. Fetch GET /api/bootstrap (businesses, bookings, notifications ... for whoever is logged in).
   2. Start app.js with that data instead of the demo data saved in the browser.
   3. Whenever the app saves (saveDB), ApiSync works out WHAT CHANGED and sends only that
      to POST /api/sync. The server checks every change (permissions, double bookings).

   Login tokens (JWT) are kept per portal: one for the client, one for the business, one for the admin. */
(function () {
  'use strict';
  const TK = 'appointly.tokens';
  const Tokens = {
    all() { try { return JSON.parse(localStorage.getItem(TK) || '{}') || {}; } catch (e) { return {}; } },
    save(t) { try { localStorage.setItem(TK, JSON.stringify(t)); } catch (e) {} },
    put(role, token) { const t = this.all(); t[role] = token; this.save(t); },
    drop(role) { const t = this.all(); if (role === 'bearer') return; delete t[role]; this.save(t); },
    has(role) { return !!this.all()[role]; }
  };

  function headers(json) {
    const t = Tokens.all(), h = { 'Accept': 'application/json' };
    if (json) h['Content-Type'] = 'application/json';
    if (t.client) h['X-Client-Token'] = t.client;
    if (t.business) h['X-Business-Token'] = t.business;
    if (t.admin) h['X-Admin-Token'] = t.admin;
    return h;
  }
  function message(j) {
    if (!j) return '';
    const d = j.detail;
    if (typeof d === 'string') return d;
    if (Array.isArray(d) && d[0]) {
      const f = (d[0].loc || []).slice(-1)[0];
      if (f === 'email') return 'Enter a valid email address.';
      if (f === 'password') return 'Password needs at least 8 characters.';
      if (f === 'phone') return 'Enter a 10-digit mobile number.';
      return d[0].msg || '';
    }
    return '';
  }
  async function req(method, path, body) {
    const r = await fetch(path, { method, headers: headers(body !== undefined), cache: 'no-store',
      body: body === undefined ? undefined : JSON.stringify(body) });
    let j = null;
    try { j = await r.json(); } catch (e) {}
    if (!r.ok) { const e = new Error(message(j) || ('Something went wrong (' + r.status + ').')); e.status = r.status; throw e; }
    return j;
  }
  window.Api = { req, Tokens };

  /* ---------- saving: send only what changed ---------- */
  const J = v => JSON.stringify(v === undefined ? null : v);
  const byId = (list, key) => { const m = {}; (list || []).forEach(x => { if (x && x[key || 'id'] != null) m[x[key || 'id']] = J(x); }); return m; };
  const mapJ = obj => { const m = {}; Object.keys(obj || {}).forEach(k => { m[k] = J(obj[k]); }); return m; };

  const ApiSync = window.ApiSync = {
    ready: false, snap: null, timer: null, busy: false, again: false,
    take() {
      return {
        bookings: byId(BOOKINGS), biz: mapJ(BIZ), notifs: byId(DB.notifs),
        cats: J(DB.cats), catReq: J(DB.catReq), appt: mapJ(DB.appt), rem: mapJ(DB.rem || {}),
        favs: J(DB.favs), profile: J(DB.profile), myReviews: J(DB.myReviews),
        clientName: AUTH.client ? AUTH.client.name : null
      };
    },
    start() { this.snap = this.take(); this.ready = true; },
    schedule() { if (!this.ready) return; clearTimeout(this.timer); this.timer = setTimeout(() => this.flush(), 250); },
    changes(now) {
      const s = this.snap, p = {}; let n = 0;
      const changed = (a, b) => Object.keys(a).filter(k => a[k] !== b[k]);
      const bk = changed(now.bookings, s.bookings).map(id => BOOKINGS.find(k => k.id === id)).filter(Boolean);
      if (bk.length) { p.bookings = bk; n++; }
      const bz = changed(now.biz, s.biz).map(id => BIZ[id]).filter(Boolean);
      if (bz.length) { p.businesses = bz; n++; }
      const nt = changed(now.notifs, s.notifs).map(id => DB.notifs.find(x => x.id === id)).filter(Boolean);
      if (nt.length) { p.notifs = nt; n++; }
      ['appt', 'rem'].forEach(f => {
        const keys = changed(now[f], s[f]).concat(Object.keys(s[f]).filter(k => !(k in now[f])));
        if (keys.length) { p[f] = {}; keys.forEach(k => { p[f][k] = (DB[f] || {})[k] || null; }); n++; }
      });
      if (now.cats !== s.cats) { p.cats = DB.cats; n++; }
      if (now.catReq !== s.catReq) { p.catReq = DB.catReq; n++; }
      if (AUTH.client) {
        if (now.favs !== s.favs) { p.favs = DB.favs; n++; }
        if (now.profile !== s.profile) { p.profile = DB.profile; n++; }
        if (now.myReviews !== s.myReviews) { p.myReviews = DB.myReviews; n++; }
        if (now.clientName !== s.clientName) { p.clientName = AUTH.client.name; n++; }
      }
      return n ? p : null;
    },
    async flush() {
      if (this.busy) { this.again = true; return; }
      const now = this.take(), payload = this.changes(now);
      if (!payload) return;
      this.busy = true;
      try {
        const r = await req('POST', 'api/sync', payload);
        this.snap = now;
        if (r && r.rejected && r.rejected.length) {
          const first = r.rejected[0];
          toast(esc(first.detail || 'Some changes were not saved.'), first.status === 409 ? 'clock' : 'x');
          await this.reload(); render();
        }
      } catch (e) {
        if (e.status === 401) { await this.reload(); render(); }
        toast('Could not save just now. Check your connection.', 'x');
      } finally {
        this.busy = false;
        if (this.again) { this.again = false; this.schedule(); }
      }
    },
    /* Fetch fresh data (after logging in or out) and swap it in WITHOUT reloading the page,
       so a booking the user was in the middle of can continue. */
    async reload() {
      const b = await req('GET', 'api/bootstrap');
      (b.invalid || []).forEach(r => Tokens.drop(r));
      const d = b.db;
      DB.cats.splice(0, DB.cats.length, ...d.cats);
      DB.catReq.splice(0, DB.catReq.length, ...d.catReq);
      DB.appt = d.appt; DB.rem = d.rem; DB.notifs = d.notifs;
      DB.favs = d.favs; DB.myReviews = d.myReviews; DB.profile = d.profile;
      BOOKINGS.splice(0, BOOKINGS.length, ...d.bookings);
      const seen = {};
      b.businesses.forEach(x => { seen[x.id] = 1; prepBiz(x); BIZ[x.id] = x; });
      Object.keys(BIZ).forEach(id => { if (!seen[id]) delete BIZ[id]; });
      GEN.clear();
      ['client', 'business', 'admin'].forEach(r => { AUTH[r] = b.auth[r]; });
      this.snap = this.take();
    },
    /* Called by saveAuth(): if the app logged a portal out, forget that token. */
    authChanged() {
      let dropped = false;
      ['client', 'business', 'admin'].forEach(r => { if (!AUTH[r] && Tokens.has(r)) { Tokens.drop(r); dropped = true; } });
      if (dropped) this.reload().then(render).catch(() => {});
      else this.schedule();
    }
  };

  /* ---------- logins ---------- */
  window.ApiAuth = {
    async client(phone, code, name) {
      const r = await req('POST', 'api/auth/client', { phone, code, name: name || '' });
      Tokens.put('client', r.access_token); await ApiSync.reload(); return r.user;
    },
    async business(email, password) {
      const r = await req('POST', 'api/auth/business', { email, password });
      Tokens.put('business', r.access_token); await ApiSync.reload(); return r.user;
    },
    async demoBusiness(businessId) {
      const r = await req('POST', 'api/auth/demo-business', { business_id: businessId });
      Tokens.put('business', r.access_token); await ApiSync.reload(); return r.user;
    },
    async admin(email, password, code) {
      const r = await req('POST', 'api/auth/admin', { email, password, code });
      Tokens.put('admin', r.access_token); await ApiSync.reload(); return r.user;
    },
    async registerBusiness(business, email, password, owner) {
      const r = await req('POST', 'api/auth/register-business', { business, email, password, owner });
      Tokens.put('business', r.access_token); await ApiSync.reload(); return r;
    }
  };

  /* ---------- start ---------- */
  function screen(html) { const m = document.getElementById('app'); if (m) m.innerHTML = '<div style="min-height:60vh;display:grid;place-items:center;text-align:center;padding:40px;font-family:system-ui,sans-serif;color:#7a5a4a">' + html + '</div>'; }
  async function boot() {
    screen('<div><div style="font-size:40px">🐾</div><p>Loading Appointly…</p></div>');
    let b;
    try { b = await req('GET', 'api/bootstrap'); }
    catch (e) {
      screen('<div><p><b>Can’t reach the Appointly server.</b></p><p>Check that it’s running, then try again.</p><p><button onclick="location.reload()" style="padding:10px 18px;border-radius:999px;border:0;background:#F25A12;color:#fff;font-weight:600;cursor:pointer">Try again</button></p></div>');
      return;
    }
    (b.invalid || []).forEach(r => Tokens.drop(r));
    window.__APPOINTLY_BOOT = b;
    const s = document.createElement('script');
    s.src = 'js/app.js';
    s.onload = () => ApiSync.start();
    document.body.appendChild(s);
  }
  boot();
})();
