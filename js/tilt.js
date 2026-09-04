/* ============================================
   3D TILT EFFECT (Mouse / Touch)
   ============================================ */
(function () {
  const TILT_TARGETS = '.project-card, .glass-card, .edu-card, .testimonial-card';
  const MAX_TILT = 10; // degrees
  const PERSPECTIVE = 1000;
  const SCALE = 1.02;

  function applyTilt(el, x, y) {
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (x - cx) / (rect.width  / 2);
    const dy   = (y - cy) / (rect.height / 2);
    const rotX = -dy * MAX_TILT;
    const rotY =  dx * MAX_TILT;

    el.style.transform    = `perspective(${PERSPECTIVE}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${SCALE})`;
    el.style.transition   = 'transform 0.1s ease';
  }

  function resetTilt(el) {
    el.style.transform  = '';
    el.style.transition = 'transform 0.4s ease';
  }

  function init() {
    document.querySelectorAll(TILT_TARGETS).forEach(el => {
      // Mouse
      el.addEventListener('mousemove', e => applyTilt(el, e.clientX, e.clientY));
      el.addEventListener('mouseleave', () => resetTilt(el));

      // Touch
      el.addEventListener('touchmove', e => {
        const touch = e.touches[0];
        applyTilt(el, touch.clientX, touch.clientY);
      }, { passive: true });

      el.addEventListener('touchend', () => resetTilt(el));
    });
  }

  // Init after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
