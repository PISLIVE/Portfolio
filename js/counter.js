/* ============================================
   ANIMATED NUMBER COUNTERS
   ============================================ */
(function () {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  let triggered = false;

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  function checkVisible() {
    if (triggered) return;
    const first = counters[0];
    const rect  = first.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      triggered = true;
      counters.forEach(counter => animateCounter(counter));
    }
  }

  window.addEventListener('scroll', checkVisible, { passive: true });
  // Check immediately (in case already in view)
  setTimeout(checkVisible, 2000);
})();
