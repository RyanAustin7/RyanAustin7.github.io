window.onload = adjustResumeLink;
window.onresize = adjustResumeLink;

function adjustResumeLink() {
  const screenWidth = window.innerWidth;
  const resumeLink = document.querySelector('a[href="resume.html"]'); // Select the Resume link

  if (screenWidth <= 514) {
    // For mobile, change the link to the PDF file
    resumeLink.href = "../RyanAustin_Resume.pdf"; // Direct link to the PDF
  } else {
    // For desktop, ensure it links to the resume page
    resumeLink.href = "resume.html"; // Normal link to the resume page
  }
}
