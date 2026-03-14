// ============================================================
//  lightbox.js — video lightbox
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const lightbox      = document.getElementById('lightbox');
  const lightboxVideo = document.getElementById('lightbox-video');
  const closeBtn      = document.getElementById('lightbox-close');
  const triggers      = document.querySelectorAll('.video-trigger');

  if (!lightbox || !lightboxVideo || !closeBtn) return;

  const openLightbox = (url) => {
    const autoUrl = url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
    lightboxVideo.src = autoUrl;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxVideo.src = '';
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      openLightbox(trigger.getAttribute('href') || trigger.dataset.href);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

});
