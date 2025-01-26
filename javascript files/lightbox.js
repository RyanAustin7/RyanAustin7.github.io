// Get elements
const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightbox-video');
const closeLightbox = document.getElementById('lightbox-close');
const triggers = document.querySelectorAll('.video-lightbox-trigger');

// Open lightbox
triggers.forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    const videoUrl = trigger.getAttribute('href');
    lightboxVideo.src = videoUrl + "?autoplay=1"; // Add autoplay parameter
    lightbox.classList.remove('hidden');
  });
});

// Close lightbox
const closeLightboxFunction = () => {
  lightboxVideo.src = ''; // Stop the video
  lightbox.classList.add('hidden');
};

closeLightbox.addEventListener('click', closeLightboxFunction);

// Close lightbox when clicking outside the video
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) {
    closeLightboxFunction();
  }
});

// Close lightbox on Escape key press
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) {
    closeLightboxFunction();
  }
});
