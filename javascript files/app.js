/* ============================================================
   app.js — Ryan Austin Audio v3
   Elite interactions: Lenis smooth scroll, GSAP animations,
   custom magnetic cursor, text splitting, parallax,
   page transitions, scroll-triggered reveals
   ============================================================ */

import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm';
import { ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm';
import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   1. LENIS SMOOTH SCROLLING
   ============================================================ */
const lenis = new Lenis({
  duration: 1.3,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
const playLabel  = document.getElementById('cursor-play-label');

// Only activate on non-touch devices
const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

if (cursor && cursorRing && !isTouchDevice()) {
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let activated = false;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // First move: show cursor and hide native cursor
    if (!activated) {
      activated = true;
      document.body.classList.add('has-custom-cursor');
      gsap.to([cursor, cursorRing], { opacity: 1, duration: 0.4 });
    }

    gsap.to(cursor, {
      x: mouseX,
      y: mouseY,
      duration: 0.12,
      ease: 'power3.out',
    });
  });

  // Ring follows with lag
  (function ringLoop() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    gsap.set(cursorRing, { x: ringX, y: ringY });
    requestAnimationFrame(ringLoop);
  })();

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    gsap.to([cursor, cursorRing], { opacity: 0, duration: 0.3 });
  });

  document.addEventListener('mouseenter', () => {
    if (activated) gsap.to([cursor, cursorRing], { opacity: 1, duration: 0.3 });
  });

  // "Play" label on video triggers
  document.querySelectorAll('.video-trigger').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (playLabel) gsap.to(playLabel, { opacity: 1, y: 0, duration: 0.3 });
      gsap.to(cursor, { width: 72, height: 72, duration: 0.3, ease: 'power2.out' });
      gsap.to(cursorRing, { opacity: 0, duration: 0.2 });
    });
    el.addEventListener('mousemove', e => {
      if (playLabel) gsap.set(playLabel, { x: e.clientX, y: e.clientY });
    });
    el.addEventListener('mouseleave', () => {
      if (playLabel) gsap.to(playLabel, { opacity: 0, y: 20, duration: 0.3 });
      gsap.to(cursor, { width: 10, height: 10, duration: 0.3, ease: 'power2.out' });
      gsap.to(cursorRing, { opacity: 1, duration: 0.2 });
    });
  });
}

/* ============================================================
   3. MAGNETIC BUTTONS & NAV LINKS
   ============================================================ */
function initMagnetic(selector, strength = 0.4) {
  document.querySelectorAll(selector).forEach(el => {
    const rect = () => el.getBoundingClientRect();

    el.addEventListener('mousemove', e => {
      const r  = rect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

initMagnetic('.hero-cta', 0.35);
initMagnetic('.nav-links a', 0.3);
initMagnetic('.bio-links a', 0.25);
initMagnetic('.dl-btn', 0.3);

/* ============================================================
   4. TEXT SPLITTING + HERO ANIMATION
   ============================================================ */
function splitChars(el) {
  if (!el) return;
  const text  = el.textContent;
  el.innerHTML = '';
  el.setAttribute('aria-label', text);

  [...text].forEach(char => {
    const outer = document.createElement('span');
    const inner = document.createElement('span');
    outer.classList.add('char');
    inner.classList.add('char-inner');
    inner.textContent = char === ' ' ? '\u00A0' : char;
    outer.appendChild(inner);
    el.appendChild(outer);
  });

  return el.querySelectorAll('.char-inner');
}

function initHeroAnimation() {
  const logo      = document.querySelector('.hero-logo');
  const eyebrow   = document.querySelector('.hero-eyebrow');
  const nameEl    = document.querySelector('.hero-name');
  const titleLine = document.querySelector('.hero-title-line');
  const divider   = document.querySelector('.hero-divider');
  const tagline   = document.querySelector('.hero-tagline');
  const cta       = document.querySelector('.hero-cta');
  const scroll    = document.querySelector('.hero-scroll-indicator');

  if (!nameEl) return;

  const chars = splitChars(nameEl);
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to(logo, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 0.1)
    .to(eyebrow, { opacity: 1, y: 0, duration: 0.8 }, 0.35)
    .to(chars, {
      y: 0,
      duration: 0.9,
      stagger: 0.03,
      ease: 'power3.out',
    }, 0.5)
    .to(titleLine, { opacity: 1, y: 0, duration: 0.7 }, 0.9)
    .to(divider,   { opacity: 1, scaleY: 1, duration: 0.8 }, 1.1)
    .to(tagline,   { opacity: 1, y: 0, duration: 0.8 }, 1.25)
    .to(cta,       { opacity: 1, y: 0, duration: 0.7 }, 1.4)
    .to(scroll,    { opacity: 1, y: 0, duration: 0.7 }, 1.6);
}

/* ============================================================
   5. STICKY HEADER ON SCROLL
   ============================================================ */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  ScrollTrigger.create({
    start: 'top -80px',
    onEnter:      () => header.classList.add('scrolled'),
    onLeaveBack:  () => header.classList.remove('scrolled'),
  });
}

/* ============================================================
   6. SCROLL-TRIGGERED REVEALS
   ============================================================ */
function initScrollReveals() {
  // Generic reveal blocks
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    const dir   = el.dataset.reveal || 'up';
    const delay = parseFloat(el.dataset.delay || 0);
    const from  = dir === 'up'    ? { y: 40, opacity: 0 }
                : dir === 'left'  ? { x: -40, opacity: 0 }
                : dir === 'right' ? { x:  40, opacity: 0 }
                :                   { opacity: 0 };

    gsap.from(el, {
      ...from,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });

  // Staggered card rows
  gsap.utils.toArray('[data-stagger-row]').forEach(row => {
    const items = row.querySelectorAll('[data-stagger-item]');
    gsap.from(items, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: row,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Section titles: character reveal on scroll
  gsap.utils.toArray('[data-split-scroll]').forEach(el => {
    const chars = splitChars(el);
    if (!chars) return;
    gsap.from(chars, {
      y: '110%',
      duration: 0.75,
      stagger: 0.025,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
    });
  });
}

/* ============================================================
   7. PARALLAX ON THUMBNAILS
   ============================================================ */
function initParallax() {
  gsap.utils.toArray('.video-feature img, .p-thumb img').forEach(img => {
    gsap.fromTo(img,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.video-feature, .p-card'),
          scrub: 1.5,
          start: 'top bottom',
          end: 'bottom top',
        },
      }
    );
  });
}

/* ============================================================
   8. HORIZONTAL SCROLL DRAG (portfolio tracks)
   ============================================================ */
function initDragScroll() {
  document.querySelectorAll('.scroll-track').forEach(track => {
    let isDown = false;
    let startX, scrollLeft;
    let velocity = 0;
    let lastX = 0;
    let momentum;

    track.addEventListener('mousedown', e => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      lastX = e.pageX;
      clearInterval(momentum);
    });

    track.addEventListener('mouseleave', () => { isDown = false; });
    track.addEventListener('mouseup',    () => { isDown = false; startMomentum(); });

    track.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      velocity = e.pageX - lastX;
      lastX    = e.pageX;
      track.scrollLeft = scrollLeft - walk;
    });

    function startMomentum() {
      momentum = setInterval(() => {
        if (Math.abs(velocity) < 0.5) { clearInterval(momentum); return; }
        track.scrollLeft -= velocity;
        velocity *= 0.92;
      }, 16);
    }
  });
}

/* ============================================================
   9. PAGE TRANSITION
   ============================================================ */
function initPageTransitions() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  // Animate in on load
  gsap.from(overlay, {
    scaleY: 1,
    transformOrigin: 'top',
    duration: 0.7,
    ease: 'power2.inOut',
  });

  // Intercept internal links
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') ||
        href.startsWith('http') || href.startsWith('https')) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      gsap.to(overlay, {
        scaleY: 1,
        transformOrigin: 'bottom',
        duration: 0.55,
        ease: 'power2.inOut',
        onComplete: () => { window.location.href = href; },
      });
    });
  });
}

/* ============================================================
   10. LIGHTBOX
   ============================================================ */
function initLightbox() {
  const lb      = document.getElementById('lightbox');
  const lbVideo = document.getElementById('lightbox-video');
  const lbClose = document.getElementById('lightbox-close');

  if (!lb || !lbVideo || !lbClose) return;

  const open = url => {
    const auto = url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
    lbVideo.src = auto;
    lb.classList.add('visible');
    lenis.stop();
    document.body.style.cursor = 'none';
  };

  const close = () => {
    lbVideo.src = '';
    lb.classList.remove('visible');
    lenis.start();
  };

  document.querySelectorAll('.video-trigger').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      open(el.getAttribute('href') || el.dataset.href);
    });
  });

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.classList.contains('visible')) close();
  });
}

/* ============================================================
   11. HAMBURGER NAV
   ============================================================ */
function initNav() {
  const btn   = document.getElementById('hamburgerBtn');
  const links = document.getElementById('navMenu');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

/* ============================================================
   12. RESUME LINK SWAP (mobile → PDF)
   ============================================================ */
function adjustResumeLink() {
  const link =
    document.querySelector('a[href="pages/resume.html"]') ||
    document.querySelector('a[href="resume.html"]');
  if (!link) return;

  const isSubpage = link.getAttribute('href').startsWith('resume');
  const pdf  = isSubpage ? '../RyanAustin_Resume.pdf' : 'RyanAustin_Resume.pdf';
  const html = isSubpage ? 'resume.html'              : 'pages/resume.html';
  link.href  = window.innerWidth <= 514 ? pdf : html;
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initStickyHeader();
  initHeroAnimation();
  initScrollReveals();
  initParallax();
  initDragScroll();
  initPageTransitions();
  initLightbox();
  adjustResumeLink();
  window.addEventListener('resize', adjustResumeLink);
});
