document.addEventListener('DOMContentLoaded', () => {

  const lightbox      = document.getElementById('lightbox');
  const lightboxVideo = document.getElementById('lightbox-video');
  const closeLightbox = document.getElementById('lightbox-close');
  const triggers      = document.querySelectorAll('.video-lightbox-trigger');

  if (!lightbox || !lightboxVideo || !closeLightbox) return; // page has no lightbox

  // Open lightbox
  triggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      const videoUrl    = trigger.getAttribute('href');
      const autoplayUrl = videoUrl.includes('?')
        ? `${videoUrl}&autoplay=1`
        : `${videoUrl}?autoplay=1`;
      lightboxVideo.src = autoplayUrl;
      lightbox.classList.remove('hidden');
    });
  });

  // Close lightbox
  const closeLightboxFunction = () => {
    lightboxVideo.src = '';
    lightbox.classList.add('hidden');
  };

  closeLightbox.addEventListener('click', closeLightboxFunction);

  // Close when clicking outside the video
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightboxFunction();
  });

  // Close on Escape key
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightboxFunction();
    }
  });

});
