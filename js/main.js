/* ============================================
   MAIN.JS — App orchestrator & misc effects
   ============================================ */
(function () {

  // ── Hero Parallax ──────────────────────────
  const heroBgImg = document.querySelector('.hero__bg-img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroBgImg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }, { passive: true });
  }

  // ── Avatar 3D Mouse Track (Hero) ───────────
  const heroVisual = document.getElementById('hero-visual');
  const avatarFrame = document.querySelector('.avatar-frame');
  if (heroVisual && avatarFrame) {
    heroVisual.addEventListener('mousemove', e => {
      const rect = heroVisual.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      const rotX = -dy * 12;
      const rotY =  dx * 12;
      heroVisual.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      heroVisual.style.transition = 'transform 0.1s ease';
    });

    heroVisual.addEventListener('mouseleave', () => {
      heroVisual.style.transform  = '';
      heroVisual.style.transition = 'transform 0.6s ease';
    });
  }

  // ── Smooth anchor scrolling for all hash links ──
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Dynamic copyright year ──────────────────
  const copyEl = document.querySelector('.footer__copy');
  if (copyEl) {
    copyEl.innerHTML = copyEl.innerHTML.replace('2025', new Date().getFullYear());
  }

  // ── Highlight nav logo on scroll top ───────
  const navLogo = document.getElementById('nav-logo');
  if (navLogo) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < 50) navLogo.style.opacity = '1';
    }, { passive: true });
  }

  // ── Section accent glow on enter ───────────
  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section--visible');
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(s => sectionObserver.observe(s));

  // ── Console easter egg ──────────────────────
  console.log('%c👋 Hey, developer!', 'font-size:20px; color:#fbbf24; font-weight:bold;');
  console.log('%cThis portfolio was built with pure HTML, CSS & JavaScript.', 'font-size:13px; color:#94a3b8;');
  console.log('%c💼 Looking to hire? Drop me a line!', 'font-size:13px; color:#f59e0b;');

})();
