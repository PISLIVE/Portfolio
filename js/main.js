/* ============================================
   MAIN.JS — App orchestrator & extra effects
   ============================================ */
(function () {

  // ── Hero Parallax ──────────────────────────
  const heroBgImg = document.querySelector('.hero__bg-img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroBgImg.style.transform = `translateY(${scrollY * 0.22}px) scale(1.05)`;
    }, { passive: true });
  }

  // ── Avatar Hover (Hero) ────────────────────
  const heroVisual = document.getElementById('hero-visual');
  if (heroVisual) {
    heroVisual.addEventListener('mouseenter', () => {
      heroVisual.style.transform  = 'translateY(-6px)';
      heroVisual.style.transition = 'transform 0.4s ease';
    });
    heroVisual.addEventListener('mouseleave', () => {
      heroVisual.style.transform  = '';
    });
  }

  // ── Reset any inline tilt transforms ───────
  document.querySelectorAll('.project-card, .glass-card, .edu-card, .blog-card').forEach(el => {
    el.style.transform   = '';
    el.style.boxShadow   = '';
    el.style.borderColor = '';
  });


  // ── Ripple Effect on Buttons ───────────────
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const ripple  = document.createElement('span');
      ripple.className = 'ripple';
      const rect    = btn.getBoundingClientRect();
      const size    = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
        position: absolute;
        border-radius: 50%;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // ── Glitch Effect on Hero Title ────────────
  const heroTitle = document.querySelector('.hero__title .highlight-gold');
  if (heroTitle) {
    heroTitle.setAttribute('data-text', heroTitle.textContent);
    heroTitle.classList.add('glitch');
  }

  // ── Smooth anchor scrolling ─────────────────
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
    copyEl.innerHTML = copyEl.innerHTML.replace(/\d{4}/, new Date().getFullYear());
  }

  // ── Hover shimmer on section titles ────────
  document.querySelectorAll('.section-title').forEach(el => {
    el.addEventListener('mouseenter', () => el.classList.add('shimmer-text'));
    el.addEventListener('mouseleave', () => el.classList.remove('shimmer-text'));
  });

  // ── Skills category bounce on hover ────────
  document.querySelectorAll('.skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform  = 'translateY(-5px) scale(1.01)';
      el.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform  = '';
    });
  });

  // ── Experience card dot pulse on viewport ──
  const dots = document.querySelectorAll('.dot-inner');
  const dotObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
      } else {
        e.target.style.animationPlayState = 'paused';
      }
    });
  });
  dots.forEach(d => dotObs.observe(d));

  // ── Section accent glow ─────────────────────
  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('section--visible');
    });
  }, { threshold: 0.15 });
  sections.forEach(s => sectionObserver.observe(s));

  // ── Project card icon pop on hover ─────────
  document.querySelectorAll('.project-card').forEach(card => {
    const icon = card.querySelector('.project-card__icon');
    if (!icon) return;
    card.addEventListener('mouseenter', () => {
      icon.style.transform  = 'scale(1.2) rotate(-5deg)';
      icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    card.addEventListener('mouseleave', () => {
      icon.style.transform = '';
    });
  });

  // ── Blog card lift ──────────────────────────
  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('.blog-card__link').style.letterSpacing = '0.5px';
    });
    card.addEventListener('mouseleave', () => {
      const l = card.querySelector('.blog-card__link');
      if (l) l.style.letterSpacing = '';
    });
  });

  // ── Console easter egg ──────────────────────
  console.log('%c👋 Hey, developer!', 'font-size:20px; color:#fbbf24; font-weight:bold;');
  console.log('%cThis portfolio was built with pure HTML, CSS & JavaScript.', 'font-size:13px; color:#94a3b8;');
  console.log('%c💼 Looking to hire Prince? Drop a line!', 'font-size:13px; color:#f59e0b;');

})();
