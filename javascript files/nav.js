// ============================================================
//  nav.js — shared navigation logic for all pages
// ============================================================

// ---------- Hamburger toggle ----------
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  const btn  = document.getElementById('hamburgerBtn');
  const icon  = btn.querySelector('.icon');
  const label = btn.querySelector('.label');

  menu.classList.toggle('show');

  if (menu.classList.contains('show')) {
    icon.textContent  = '✖';
    label.textContent = 'Close';
  } else {
    icon.textContent  = '☰';
    label.textContent = 'Menu';
  }
}
