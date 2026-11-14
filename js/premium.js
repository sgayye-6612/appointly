/* Appointly · Premium motion (visual only, no app logic)
   - Page fade-in when you move to a different page
   - Cards and sections gently rise into view while scrolling
   - Click ripple on buttons, soft spotlight that follows the mouse on cards
   - Dashboard numbers count up
   Everything is skipped for people who prefer reduced motion. */
(function () {
  'use strict';
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const app = () => document.getElementById('app');

  /* ---- 1. Ripple on buttons ---- */
  document.addEventListener('pointerdown', e => {
    if (reduce) return;
    const b = e.target.closest('.btn,.chip,.slot');
    if (!b || b.disabled) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2.2;
    const dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    if (getComputedStyle(b).position === 'static') b.style.position = 'relative';
    b.style.overflow = 'hidden';
    b.appendChild(dot);
    setTimeout(() => dot.remove(), 650);
  }, { passive: true });

  /* ---- 2. Spotlight that follows the mouse on cards ---- */
  const SPOT = '.biz,.catcard,.feat,.plan,.entry-card,.kpi';
  let raf = 0, last = null;
  document.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    last = e;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const el = last.target.closest && last.target.closest(SPOT);
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (last.clientX - r.left) + 'px');
      el.style.setProperty('--my', (last.clientY - r.top) + 'px');
    });
  }, { passive: true });

  /* ---- 3. Reveal on scroll ---- */
  const REVEAL = '.sec-head,.feat,.ind,.plan,.steps li,.way,.biz,.catcard,.member,.review,.kpi,.flow-item,.install,.reco,.svc-group,.psec';
  const io = !reduce && 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;

  function reveal(root) {
    if (!io) return;
    const seen = new Map();
    root.querySelectorAll(REVEAL).forEach(el => {
      if (el.closest('.drawer,.modal,.scrim')) return;
      // small stagger between siblings in the same grid
      const p = el.parentElement, i = seen.get(p) || 0;
      seen.set(p, i + 1);
      el.style.setProperty('--rd', Math.min(i, 6) * 0.06 + 's');
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ---- 4. Count-up for dashboard numbers ---- */
  function countUp(root) {
    if (reduce) return;
    root.querySelectorAll('.kpi b').forEach(el => {
      const txt = el.textContent.trim(), m = txt.match(/[\d,]+(\.\d+)?/);
      if (!m) return;
      const target = parseFloat(m[0].replace(/,/g, ''));
      if (!isFinite(target) || target < 2) return;
      const pre = txt.slice(0, m.index), post = txt.slice(m.index + m[0].length);
      const fmt = n => pre + Math.round(n).toLocaleString('en-IN') + post;
      const t0 = performance.now(), dur = 900;
      el.classList.add('count');
      (function step(t) {
        const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = fmt(target * e);
        if (k < 1 && el.isConnected) requestAnimationFrame(step); else el.textContent = txt;
      })(t0);
    });
  }

  /* ---- 5. Page change detection ----
     app.js re-draws #app on every click; we only animate when the PAGE changes,
     so small updates (picking a slot, ticking a box) don't flicker. */
  let lastKey = null;
  function pageKey() {
    try { return S.view + '|' + (S.arg || '') + '|' + (S.dash || ''); } catch (e) { return location.hash; }
  }
  function onRender() {
    const el = app();
    if (!el) return;
    const key = pageKey();
    if (key === lastKey) return;
    lastKey = key;
    if (!reduce) {
      el.classList.remove('page-enter');
      void el.offsetWidth; // restart the animation
      el.classList.add('page-enter');
      clearTimeout(onRender.t);
      onRender.t = setTimeout(() => el.classList.remove('page-enter'), 700);
    }
    reveal(el);
    if (key.startsWith('dashboard')) countUp(el);
  }

  function start() {
    const el = app();
    if (!el) return setTimeout(start, 50);
    new MutationObserver(onRender).observe(el, { childList: true });
    onRender();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
