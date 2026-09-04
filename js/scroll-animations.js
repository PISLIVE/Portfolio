/* ============================================
   SCROLL-TRIGGERED ANIMATIONS (IntersectionObserver)
   ============================================ */
(function () {
  // 1. General fade-in animations
  function initScrollAnimations() {
    const targets = document.querySelectorAll(
      '.section-header, .about__grid > *, .skill-category, .timeline-item, ' +
      '.project-card, .edu-card, .testimonial-card, .blog-card, ' +
      '.contact__info, .contact__form-col'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger by index within the same parent
          const siblings = Array.from(entry.target.parentElement.children);
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('animated');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
          }, idx * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    targets.forEach(el => {
      el.style.opacity  = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // 2. Skill bar animations
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

  // 3. Timeline line animation
  function initTimeline() {
    const line = document.querySelector('.timeline__line');
    if (!line) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          line.style.transition = 'opacity 1s ease';
          line.style.opacity = '0.3';
        }
      });
    }, { threshold: 0.1 });

    line.style.opacity = '0';
    observer.observe(line);
  }

  // Run after page loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      initScrollAnimations();
      initSkillBars();
      initTimeline();
    }, 500);
  });
})();
