/* ============================================
   PAGE LOADER
   ============================================ */
(function () {
  const loader   = document.getElementById('loader');
  const progress = loader ? loader.querySelector('.loader__progress') : null;
  if (!loader || !progress) return;

  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 18 + 5;
    if (pct >= 100) {
      pct = 100;
      progress.style.width = '100%';
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        // Trigger hero animations after load
        document.querySelectorAll('#hero-content, #hero-visual').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }, 400);
    } else {
      progress.style.width = pct + '%';
    }
  }, 80);

  // Prevent scroll during load
  document.body.style.overflow = 'hidden';
})();
