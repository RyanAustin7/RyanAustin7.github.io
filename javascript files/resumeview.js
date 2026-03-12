// ============================================================
//  resumeview.js — adjusts the Resume nav link on mobile
//  Works for both index.html (root) and pages/ subpages.
// ============================================================

function adjustResumeLink() {
  // Match whichever path is present in the nav
  const resumeLink =
    document.querySelector('a[href="resume.html"]') ||
    document.querySelector('a[href="pages/resume.html"]');

  if (!resumeLink) return; // page has no resume link — do nothing

  const isSubpage = resumeLink.getAttribute('href').startsWith('resume');
  const pdfPath   = isSubpage ? '../RyanAustin_Resume.pdf' : 'RyanAustin_Resume.pdf';
  const htmlPath  = isSubpage ? 'resume.html'              : 'pages/resume.html';

  resumeLink.href = window.innerWidth <= 514 ? pdfPath : htmlPath;
}

window.addEventListener('load',   adjustResumeLink);
window.addEventListener('resize', adjustResumeLink);
