/* Capi · global companion
   One living Capi on top of every page. He walks along the bottom of the screen, eats, naps,
   thinks, looks around and waves on his own, gives tips for the page you're on, and opens the
   existing Capi chat when you tap "Chat with me".
   - Lives outside #app, so he stays while you move between pages.
   - Never blocks the page: only Capi and his bubble take clicks, he stays small, keeps above the
     mobile bottom bar, sits still while you type, hides behind chats/popups, and can be hidden.
   - Pauses when the tab is hidden; no walking or looping motion for "reduce motion" users. */
(function () {
  'use strict';
  window.CAPI_COMPANION = true;
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = { get(k, d) { try { const v = localStorage.getItem('capi.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
                  set(k, v) { try { localStorage.setItem('capi.' + k, JSON.stringify(v)); } catch (e) {} } };
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = l => l[Math.floor(Math.random() * l.length)];
  const escH = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Capi's drawing (from appySVG, plus feet, sleepy eyes and a snack) ---------- */
  function capiSVG() {
    let s = appySVG('full');
    s = s.replace(/<rect class="a-cf"[^>]*\/>/g, '')
      .replace('class="appy full" data-mood="idle"', 'class="capi-svg"')
      .replace('role="img" aria-label="Capi the capybara"', 'aria-hidden="true" focusable="false"')
      .replace(/<ellipse cx="78" cy="205"([^>]*)\/><ellipse cx="122" cy="205"([^>]*)\/>/, '<g class="a-foot-l"><ellipse cx="78" cy="205"$1/></g><g class="a-foot-r"><ellipse cx="122" cy="205"$2/></g>')
      .replace('<g class="a-happy"', '<g class="a-sleep" fill="none" stroke="#24120C" stroke-width="3.2" stroke-linecap="round"><path d="M64 70q8 5 16 0"/><path d="M120 70q8 5 16 0"/></g><g class="a-happy"')
      .replace('<g class="a-thought">', '<g class="a-food"><path d="M76 118 A24 24 0 0 0 124 118 Z" fill="#3E9B57"/><path d="M79 118 A21 21 0 0 0 121 118 Z" fill="#E9F5DC"/><path d="M82 118 A18 18 0 0 0 118 118 Z" fill="#FF5C7A"/><ellipse cx="92" cy="124" rx="1.6" ry="2.4" fill="#2B1220"/><ellipse cx="100" cy="129" rx="1.6" ry="2.4" fill="#2B1220"/><ellipse cx="108" cy="124" rx="1.6" ry="2.4" fill="#2B1220"/></g><g class="a-thought">');
    return s;
  }

  /* ---------- tips for each page ---------- */
  function ctx() {
    let view = '', dash = '', mine = 0, pending = 0;
    try { view = S.view; dash = S.dash || ''; } catch (e) { view = (location.hash || '#home').slice(1).split('/')[0]; }
    try {
      const now = Date.now();
      mine = BOOKINGS.filter(k => k.mine && k.start > now && k.status !== 'cancelled').length;
      if (AUTH.business) pending = BOOKINGS.filter(k => k.biz === AUTH.business.id && k.status === 'pending').length;
    } catch (e) {}
    return { view, dash, mine, pending };
  }
  const chat = { label: 'Chat with me', run: () => openChat() };
  function tipsFor() {
    const c = ctx();
    const go = (label, hash) => ({ label, run: () => { location.hash = hash; } });
    const T = {
      home: [['New here? Pick “Login as User” to book, or the business card to run your bookings.', [chat]],
             ['I can find a free slot for you in seconds. Just tell me what you need!', [chat]]],
      explore: [['Tell me something like “dentist tomorrow evening” and I’ll find it.', [chat]],
                ['Tap a category to see the places near you.', []]],
      biz: [['Pick a service and I’ll show you the free times.', [chat]],
            ['Want me to book it for you? Ask me in the chat.', [chat]]],
      'client-login': [['Use your mobile number. A new number makes a new account for you.', []],
                       ['Just looking? “Continue as guest” works too.', []]],
      'business-login': [['Log in with your business email and password.', []],
                         ['New business? Registering takes a few minutes.', [go('Register', '#register')]]],
      'admin-login': [['This area is for Appointly staff only.', []]],
      register: [['Go step by step. You can always go back and change things.', []],
                 ['Add your services and hours, and I can start taking bookings for you.', []]],
      'c-home': [[c.mine ? `You have ${c.mine} upcoming booking${c.mine > 1 ? 's' : ''}. Need to change one? Ask me!` : 'No bookings yet. Shall we find something nice?', [chat]],
                 ['I’ll send reminders on WhatsApp before each visit.', []]],
      'c-calendar': [['Highlighted dates have bookings. Tap one to see it.', []]],
      'c-notifs': [['Replies from businesses land here, like new times they suggest.', []]],
      'c-profile': [['Keep WhatsApp reminders on so you never miss a visit.', []]],
      dashboard: [[c.pending ? `${c.pending} request${c.pending > 1 ? 's are' : ' is'} waiting for your reply.` : 'All caught up! No requests waiting.', []],
                  ['Ask me “how many clients today?” or “revenue this month”.', [chat]],
                  ['Share your booking link so customers can book you any time.', []]],
      admin: [['Check the businesses waiting for verification.', []]],
      chat: [['I’m right here in the chat!', []]]
    };
    const list = T[c.view] || [['Need help? Tap me any time.', [chat]]];
    return list.map(([text, acts]) => ({ text, acts }));
  }

  /* ---------- DOM ---------- */
  let world, pos, face, pet, bubble, peek, effects;
  const st = { mode: 'idle', x: 0, facing: 'l', last: 'idle', timers: [], hidden: store.get('hidden', false), quietUntil: 0, typing: false, seen: {} };

  function build() {
    world = document.createElement('div');
    world.id = 'capi-world';
    world.innerHTML = `
      <div class="capi-pos">
        <div class="capi-bubble" role="status" aria-live="polite" hidden></div>
        <span class="capi-shadow" aria-hidden="true"></span>
        <div class="capi-face"><button type="button" class="capi-pet idle" aria-label="Capi, your assistant. Tap for help.">${capiSVG()}</button></div>
        <div class="capi-fx" aria-hidden="true"></div>
      </div>
      <button type="button" class="capi-peek" aria-label="Bring Capi back" hidden>${capiSVG()}</button>`;
    document.body.appendChild(world);
    pos = world.querySelector('.capi-pos'); face = world.querySelector('.capi-face');
    pet = world.querySelector('.capi-pet'); bubble = world.querySelector('.capi-bubble');
    peek = world.querySelector('.capi-peek'); effects = world.querySelector('.capi-fx');
    pet.addEventListener('click', onTap);
    peek.addEventListener('click', () => setHidden(false));
    bubble.addEventListener('click', e => {
      const b = e.target.closest('button[data-i]');
      if (!b) return;
      const i = +b.dataset.i;
      if (i === -1) { closeBubble(true); return; }
      if (i === -2) { setHidden(true); return; }
      const a = bubble._acts && bubble._acts[i];
      closeBubble(false);
      if (a) a.run();
    });
  }

  /* ---------- layout: stay on screen, above the mobile bar ---------- */
  function width() { return pos ? pos.offsetWidth : 96; }
  function bounds() { const w = width(), m = 12; return [m, Math.max(m, window.innerWidth - w - m)]; }
  function bottomOffset() {
    const nav = document.querySelector('.bnav');
    if (nav && getComputedStyle(nav).display !== 'none' && nav.offsetHeight) return nav.offsetHeight + 4;
    return 6;
  }
  function place(x, ms) {
    const [a, b] = bounds();
    st.x = Math.min(b, Math.max(a, x));
    pos.style.transition = ms ? `transform ${ms}ms linear` : 'transform .35s ease';
    pos.style.transform = `translate3d(${st.x}px,0,0)`;
    // keep the speech bubble inside the screen
    bubble.classList.toggle('left', st.x > window.innerWidth / 2);
  }
  function relayout() { world.style.bottom = bottomOffset() + 'px'; place(st.x, 0); }

  /* ---------- the activity engine ---------- */
  function wait(ms, fn) { st.timers.push(setTimeout(fn, ms)); }
  function clear() { st.timers.forEach(clearTimeout); st.timers = []; }
  function setMode(m) { st.mode = m; pet.className = 'capi-pet ' + m; fx(m); }
  function setFacing(f) { st.facing = f; face.classList.toggle('l', f === 'l'); }
  function fx(m) {
    effects.innerHTML = m === 'sleep' ? '<span class="z">z</span><span class="z">z</span><span class="z">Z</span>'
      : m === 'eat' ? '<i class="crumb"></i><i class="crumb"></i><i class="crumb"></i>'
      : m === 'love' ? '<span class="heart">♥</span><span class="heart">♥</span><span class="heart">♥</span>' : '';
  }
  function say(text, ms) {
    if (bubble._tip) return;          // never talk over a tip the person is reading
    bubble._acts = null;
    bubble.innerHTML = `<p>${escH(text)}</p>`;
    bubble.hidden = false; bubble.classList.add('in');
    clearTimeout(bubble._t); bubble._t = setTimeout(() => { if (!bubble._tip) closeBubble(false); }, ms || 2200);
  }
  function rest(ms) { setMode('idle'); wait(ms || rnd(1000, 2000), next); }

  function next() {
    if (st.hidden || document.hidden || busy()) { wait(4000, next); return; }
    if (st.typing || reduce) { setMode('idle'); wait(6000, next); return; }
    // a page tip now and then (not too often, and not if the person closed one recently)
    if (Date.now() > st.quietUntil && Math.random() < .22) { showTip(); wait(rnd(9000, 13000), next); return; }
    const pool = [['walk', 4], ['idle', 3], ['eat', 1.6], ['think', 1.8], ['sleep', 1.1], ['wave', 1.1], ['hop', .7], ['look', 1.2]].filter(([m]) => m !== st.last);
    let r = Math.random() * pool.reduce((s, [, w]) => s + w, 0), m = pool[0][0];
    for (const [k, w] of pool) { if ((r -= w) <= 0) { m = k; break; } }
    run(m);
  }

  function run(m) {
    clear(); st.last = m;
    if (m === 'walk') {
      const [a, b] = bounds();
      let to = rnd(a, b);
      if (Math.abs(to - st.x) < (b - a) * .25) to = st.x > (a + b) / 2 ? rnd(a, a + (b - a) * .35) : rnd(a + (b - a) * .65, b);
      const ms = Math.min(9000, Math.abs(to - st.x) * 7);   // ~140 px per second
      const f = to > st.x ? 'r' : 'l';
      const go = () => { setMode('walk'); place(to, ms); wait(ms, () => rest()); };
      if (f !== st.facing) { setMode('turn'); setFacing(f); wait(380, go); } else go();
    } else if (m === 'idle' || m === 'look') {
      setMode(m === 'look' ? 'look' : 'idle');
      wait(rnd(3500, 6500), next);
    } else if (m === 'eat') {
      setMode('eat'); say('Mmm, watermelon!', 1800);
      wait(6000, () => { say('Yum!', 1100); rest(1300); });
    } else if (m === 'think') {
      setMode('think'); wait(1500, () => say(pick(['Hmm… who needs a reminder today?', 'Saturday evening looks busy…', 'Haircut or spa? Both!']), 2600));
      wait(4800, () => rest());
    } else if (m === 'sleep') {
      setMode('yawn'); say('*yawn*', 1400);
      wait(1700, () => setMode('sleep'));
      wait(rnd(9000, 13000), () => { setMode('hop'); say('I’m awake!', 1300); wait(1000, () => rest(1200)); });
    } else if (m === 'wave') {
      setMode('wave'); say(pick(['Hello!', 'Hi there!', 'Need a hand?']), 1800); wait(2100, () => rest());
    } else if (m === 'hop') {
      setMode('hop'); wait(950, () => rest());
    }
  }

  /* ---------- tips & tapping ---------- */
  function showTip(tip) {
    const t = tip || pick(tipsFor());
    if (!t) return;
    clear(); setMode('wave');
    bubble._acts = t.acts;
    bubble._tip = true;
    bubble.innerHTML = `<button type="button" class="x" data-i="-1" aria-label="Close tip">×</button><b>Capi</b><p>${escH(t.text)}</p>` +
      `<div class="acts">${t.acts.map((a, i) => `<button type="button" data-i="${i}">${escH(a.label)}</button>`).join('')}<button type="button" class="ghost" data-i="-2">Hide Capi</button></div>`;
    bubble.hidden = false; bubble.classList.add('in');
    clearTimeout(bubble._t); bubble._t = setTimeout(() => closeBubble(false), 12000);
    wait(2100, () => setMode('idle'));
  }
  function closeBubble(byUser) {
    bubble._tip = false; bubble.classList.remove('in');
    clearTimeout(bubble._t); bubble._t = setTimeout(() => { bubble.hidden = true; }, 250);
    if (byUser) st.quietUntil = Date.now() + 120000;   // closed a tip: no tips for 2 minutes
  }
  function onTap() {
    clear(); setMode('love');
    if (bubble._tip && !bubble.hidden) { closeBubble(false); openChat(); wait(1400, () => rest()); return; }   // tapping while a tip shows opens the chat
    wait(900, () => { showTip({ text: pick(tipsFor()).text, acts: [chat] }); wait(12000, next); });
  }
  function openChat() { try { ACT.appyOpen(); } catch (e) {} }
  function setHidden(h) {
    st.hidden = h; store.set('hidden', h);
    closeBubble(false);
    pos.hidden = h; peek.hidden = !h;
    if (!h) { clear(); setMode('hop'); say('I’m back!', 1400); wait(1000, () => rest()); }
  }

  /* ---------- page changes ---------- */
  function busy() {
    const d = document.getElementById('drawer'), md = document.getElementById('modal');
    return (d && d.children.length) || (md && md.children.length);
  }
  function onRoute() {
    if (!world) return;
    world.classList.toggle('away', !!busy());
    relayout();
    const v = ctx().view;
    if (!st.hidden && !st.seen[v] && Date.now() > st.quietUntil) {   // a short hello for each new page
      st.seen[v] = true;
      clear(); wait(1400, () => { showTip(); wait(12000, next); });
    }
  }
  window.CapiCompanion = { onRoute, showTip: () => showTip(), hide: () => setHidden(true), show: () => setHidden(false) };

  /* ---------- start ---------- */
  function start() {
    if (typeof appySVG !== 'function' || !document.getElementById('app') || !document.getElementById('app').children.length) { setTimeout(start, 120); return; }
    const old = document.getElementById('launch'); if (old) old.innerHTML = '';   // the living Capi replaces the old launcher
    build();
    st.x = bounds()[1]; setFacing('l'); relayout();
    if (st.hidden) { pos.hidden = true; peek.hidden = false; }
    addEventListener('resize', relayout);
    addEventListener('hashchange', () => setTimeout(onRoute, 60));
    new MutationObserver(() => { onRoute(); }).observe(document.getElementById('app'), { childList: true });
    ['drawer', 'modal'].forEach(id => { const el = document.getElementById(id); if (el) new MutationObserver(onRoute).observe(el, { childList: true }); });
    document.addEventListener('focusin', e => { if (e.target.matches('input,textarea,select,[contenteditable]')) { st.typing = true; if (st.mode === 'walk') { clear(); setMode('idle'); place(st.x, 0); wait(5000, next); } } });
    document.addEventListener('focusout', () => { st.typing = false; });
    document.addEventListener('visibilitychange', () => { world.classList.toggle('paused', document.hidden); });
    onRoute();
    wait(2500, next);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
