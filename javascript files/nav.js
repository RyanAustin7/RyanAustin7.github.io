// ============================================================
//  nav.js — shared navigation: hamburger + scroll reveal
//           + smooth page transitions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Hamburger ----------
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks  = document.getElementById('navMenu');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---------- Sticky header ----------
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ---------- Scroll reveal ----------
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => io.observe(el));
  }

  // ---------- Page transitions ----------
  let overlay = document.getElementById('page-transition');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'page-transition';
    document.body.appendChild(overlay);
  }

  // Fade overlay OUT on page load (every page opens softly)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add('loaded');
    });
  });

  // Intercept internal link clicks
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    if (!href ||
        href.startsWith('#') ||
        href.startsWith('mailto') ||
        href.startsWith('http') ||
        href.startsWith('https') ||
        link.hasAttribute('download') ||
        link.getAttribute('target') === '_blank') return;

    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.remove('loaded');
      overlay.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = href;
      }, 420);
    });
  });

});
