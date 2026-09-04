/* ============================================
   SCROLL-TRIGGERED ANIMATIONS (IntersectionObserver)
   ============================================ */
(function () {

  // ── 1. General staggered fade-in ─────────────
  function initScrollAnimations() {
    const targets = document.querySelectorAll(
      '.section-header, .about__grid > *, .skill-category, ' +
      '.project-card, .edu-card, .testimonial-card, .blog-card, ' +
      '.contact__info, .contact__form-col'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity    = '1';
          entry.target.style.transform  = 'translateY(0) scale(1)';
        }, idx * 120);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(35px) scale(0.97)';
      el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
      observer.observe(el);
    });
  }

  // ── 2. Skill bar animations ───────────────────
  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-pill__fill');
    if (!bars.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(bar => observer.observe(bar));
  }

  // ── 3. Timeline alternating slide-in ─────────
  function initTimeline() {
    const line = document.querySelector('.timeline__line');
    if (line) {
      line.style.opacity = '0';
      const lo = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            line.style.transition = 'opacity 1.2s ease';
            line.style.opacity    = '0.3';
          }
        });
      }, { threshold: 0.1 });
      lo.observe(line);
    }

    const items = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const card = entry.target.querySelector('.timeline-card');
        const isLeft = entry.target.classList.contains('timeline-item--left');
        if (card) {
          card.style.opacity   = '0';
          card.style.transform = `translateX(${isLeft ? -40 : 40}px)`;
          card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          requestAnimationFrame(() => {
            setTimeout(() => {
              card.style.opacity   = '1';
              card.style.transform = 'translateX(0)';
            }, 100);
          });
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    items.forEach(el => observer.observe(el));
  }

  // ── 4. Blog & education card stagger ─────────
  function initGridStagger(selector) {
    const grids = document.querySelectorAll(selector);
    grids.forEach(grid => {
      const children = Array.from(grid.children);
      children.forEach((child, i) => {
        child.style.opacity    = '0';
        child.style.transform  = 'translateY(30px)';
        child.style.transition = `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`;
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          Array.from(entry.target.children).forEach(child => {
            child.style.opacity   = '1';
            child.style.transform = 'translateY(0)';
          });
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.1 });

      observer.observe(grid);
    });
  }

  // ── 5. Hero stats count-up + pop ─────────────
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;
    let triggered = false;

    function animateCounter(el) {
      const target   = parseInt(el.getAttribute('data-target'), 10);
      const duration = 1600;
      const start    = performance.now();
      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.classList.add('pop');
          setTimeout(() => el.classList.remove('pop'), 400);
        }
      }
      requestAnimationFrame(update);
    }

    function check() {
      if (triggered) return;
      const rect = counters[0].getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        triggered = true;
        counters.forEach(c => animateCounter(c));
      }
    }

    window.addEventListener('scroll', check, { passive: true });
    setTimeout(check, 2200);
  }

  // Run all after page loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      initScrollAnimations();
      initSkillBars();
      initTimeline();
      initGridStagger('.blog__grid');
      initGridStagger('.education__grid');
      initGridStagger('.projects__grid');
      initCounters();
    }, 600);
  });

})();
