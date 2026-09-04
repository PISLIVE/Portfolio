/* ============================================
   TESTIMONIALS SLIDER
   ============================================ */
(function () {
  const track    = document.getElementById('testimonials-track');
  const dotsWrap = document.getElementById('testimonials-dots');
  const prevBtn  = document.getElementById('testimonial-prev');
  const nextBtn  = document.getElementById('testimonial-next');

  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  if (!cards.length) return;

  let current    = 0;
  let autoTimer  = null;
  const TOTAL    = cards.length;
  const AUTO_MS  = 5000;

  // Create dots
  if (dotsWrap) {
    for (let i = 0; i < TOTAL; i++) {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function goTo(index) {
    current = (index + TOTAL) % TOTAL;
    track.style.transform = `translateX(-${current * 100}%)`;

    // Update dots
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.testimonial-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), AUTO_MS);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Touch/Swipe
  let startX = null;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    if (startX === null) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    startX = null;
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  resetAuto();
})();
