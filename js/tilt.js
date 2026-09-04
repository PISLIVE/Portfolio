/* ============================================
   SIMPLE LIQUID TILT EFFECT
   Smooth, clean subtle 3D tilt on card hover
   ============================================ */
(function () {

  const TARGETS = '.project-card, .glass-card, .edu-card, .blog-card';

  const CONFIG = {
    maxTilt:      7,         // Subtle max tilt in degrees
    perspective:  1000,      // Standard perspective distance in px
    scale:        1.02,      // Slight, smooth scale up
    speed:        400        // Reset animation speed in ms
  };

  function onMove(el, e) {
    const rect = el.getBoundingClientRect();
    const xNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const yNorm = ((e.clientY - rect.top)  / rect.height) * 2 - 1;

    const rotX = -yNorm * CONFIG.maxTilt;
    const rotY =  xNorm * CONFIG.maxTilt;

    el.style.transform  = `perspective(${CONFIG.perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${CONFIG.scale})`;
    el.style.transition = 'transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)';
  }

  function onLeave(el) {
    el.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.transition = `transform ${CONFIG.speed}ms cubic-bezier(0.25, 1, 0.5, 1)`;
  }

  function init() {
    document.querySelectorAll(TARGETS).forEach(el => {
      el.addEventListener('mousemove', e => onMove(el, e));
      el.addEventListener('mouseleave', () => onLeave(el));

      el.addEventListener('touchmove', e => {
        if (e.touches && e.touches.length > 0) {
          const t = e.touches[0];
          onMove(el, { clientX: t.clientX, clientY: t.clientY });
        }
      }, { passive: true });

      el.addEventListener('touchend', () => onLeave(el));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

