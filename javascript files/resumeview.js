// ============================================================
//  resumeview.js — swap resume link to PDF on mobile
// ============================================================

function adjustResumeLink() {
  const link =
    document.querySelector('a[href="pages/resume.html"]') ||
    document.querySelector('a[href="resume.html"]');

  if (!link) return;

  const isSubpage = link.getAttribute('href').startsWith('resume');
  const pdf  = isSubpage ? '../RyanAustin_Resume.pdf' : 'RyanAustin_Resume.pdf';
  const html = isSubpage ? 'resume.html' : 'pages/resume.html';

  link.href = window.innerWidth <= 514 ? pdf : html;
}

window.addEventListener('load',   adjustResumeLink);
window.addEventListener('resize', adjustResumeLink);
