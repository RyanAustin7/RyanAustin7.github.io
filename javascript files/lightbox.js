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
    // Add autoplay=1 to the video URL (if not already present)
    const autoplayUrl = videoUrl.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`;
    lightboxVideo.src = autoplayUrl; // Set iframe src with autoplay
    lightbox.classList.remove('hidden'); // Show lightbox
  });
});

// Close lightbox function
const closeLightboxFunction = () => {
  lightboxVideo.src = ''; // Stop the video by clearing the src
  lightbox.classList.add('hidden'); // Hide lightbox
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
