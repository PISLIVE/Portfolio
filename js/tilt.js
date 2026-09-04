/* ============================================
   3D SPOTLIGHT EFFECT (replaces mouse-tilt)
   Cards light up from the inside following the cursor
   ============================================ */
(function () {

  const CARDS = '.project-card, .glass-card, .edu-card, .blog-card';

  // Spotlight color per card type
  const SPOTLIGHT = 'rgba(251, 191, 36, 0.12)';

  function onMove(el, e) {
    const rect = el.getBoundingClientRect();

    // Mouse position relative to card (0–100)
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;

    // Slight 3D depth tilt
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    const rotX = -dy * 6;
    const rotY =  dx * 6;

    el.style.transform  = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
    el.style.transition = 'transform 0.1s ease';

    // Moving radial spotlight
    el.style.setProperty('--spot-x', x + '%');
    el.style.setProperty('--spot-y', y + '%');
    el.classList.add('spotlight-active');
  }

  function onLeave(el) {
    el.style.transform  = '';
    el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    el.classList.remove('spotlight-active');
  }

  // Touch support
  function onTouch(el, e) {
    const t = e.touches[0];
    onMove(el, { clientX: t.clientX, clientY: t.clientY });
  }

  function init() {
    document.querySelectorAll(CARDS).forEach(el => {
      el.addEventListener('mousemove', e => onMove(el, e));
      el.addEventListener('mouseleave', () => onLeave(el));
      el.addEventListener('touchmove', e => onTouch(el, e), { passive: true });
      el.addEventListener('touchend',  () => onLeave(el));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
