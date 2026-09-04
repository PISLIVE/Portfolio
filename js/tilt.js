/* ============================================
   LIQUID TILT — Deep 3D with inner glow orb
   Cards tilt dramatically in 3D perspective.
   A glowing light orb follows the cursor inside
   the card, creating real depth and immersion.
   ============================================ */
(function () {

  const TARGETS = '.project-card, .glass-card, .edu-card, .blog-card';

  const CONFIG = {
    maxTilt:      14,        // max tilt degrees
    perspective:  800,       // px — lower = more dramatic
    scale:        1.035,     // slight zoom on hover
    speed:        300,       // ms transition on entry/exit
    glowSize:     280,       // px — size of light orb
    glowOpacity:  0.18,      // max opacity of glow
    glowColor:    '251, 191, 36'  // RGB (gold)
  };

  /* ── Build glow orb element ─────────────── */
  function createOrb(el) {
    const orb = document.createElement('div');
    orb.className = 'liquid-orb';
    orb.style.cssText = `
      position: absolute;
      pointer-events: none;
      z-index: 0;
      border-radius: 50%;
      width: ${CONFIG.glowSize}px;
      height: ${CONFIG.glowSize}px;
      background: radial-gradient(
        circle,
        rgba(${CONFIG.glowColor}, ${CONFIG.glowOpacity}) 0%,
        rgba(${CONFIG.glowColor}, 0.06) 40%,
        transparent 70%
      );
      transform: translate(-50%, -50%);
      left: 50%; top: 50%;
      transition: opacity 0.4s ease;
      opacity: 0;
      filter: blur(2px);
    `;
    // Card must be relative
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }
    el.style.overflow = 'hidden';
    el.appendChild(orb);
    return orb;
  }

  /* ── Apply tilt + move orb ─────────────── */
  function onMove(el, orb, e) {
    const rect = el.getBoundingClientRect();

    // Normalized -1 to 1
    const xNorm = ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
    const yNorm = ((e.clientY - rect.top)   / rect.height) * 2 - 1;

    const rotX = -yNorm * CONFIG.maxTilt;
    const rotY =  xNorm * CONFIG.maxTilt;

    // Apply 3D tilt
    el.style.transform  = `perspective(${CONFIG.perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${CONFIG.scale})`;
    el.style.transition = `transform 0.05s ease`;
    el.style.zIndex     = '5';

    // Move orb to cursor position
    const orbX = e.clientX - rect.left;
    const orbY = e.clientY - rect.top;
    orb.style.left    = orbX + 'px';
    orb.style.top     = orbY + 'px';
    orb.style.opacity = '1';
    orb.style.transition = 'left 0.08s ease, top 0.08s ease, opacity 0.3s ease';

    // Dynamic edge highlight (border glows on the lit side)
    const bx = (xNorm + 1) / 2;  // 0–1
    const by = (yNorm + 1) / 2;
    el.style.boxShadow = `
      ${-xNorm * 12}px ${-yNorm * 12}px 30px rgba(${CONFIG.glowColor}, 0.12),
      0 20px 60px rgba(0,0,0,0.5),
      inset ${xNorm * 1.5}px ${yNorm * 1.5}px 0 rgba(${CONFIG.glowColor}, 0.08)
    `;
    el.style.borderColor = `rgba(${CONFIG.glowColor}, ${0.15 + Math.abs(xNorm) * 0.35})`;
  }

  /* ── Reset on leave ─────────────────────── */
  function onLeave(el, orb) {
    el.style.transform   = '';
    el.style.boxShadow   = '';
    el.style.borderColor = '';
    el.style.zIndex      = '';
    el.style.transition  = `transform ${CONFIG.speed}ms cubic-bezier(0.34, 1.56, 0.64, 1),
                             box-shadow ${CONFIG.speed}ms ease,
                             border-color ${CONFIG.speed}ms ease`;
    orb.style.opacity    = '0';
  }

  /* ── Touch support ──────────────────────── */
  function onTouch(el, orb, e) {
    const t = e.touches[0];
    onMove(el, orb, { clientX: t.clientX, clientY: t.clientY });
  }

  /* ── Initialise all target cards ────────── */
  function init() {
    document.querySelectorAll(TARGETS).forEach(el => {
      const orb = createOrb(el);

      el.addEventListener('mousemove',  e => onMove(el, orb, e));
      el.addEventListener('mouseleave', ()  => onLeave(el, orb));

      el.addEventListener('touchmove', e => onTouch(el, orb, e), { passive: true });
      el.addEventListener('touchend',  ()  => onLeave(el, orb));

      // Make sure child content stays above orb
      Array.from(el.children).forEach(child => {
        if (!child.classList.contains('liquid-orb')) {
          child.style.position = child.style.position || 'relative';
          child.style.zIndex   = child.style.zIndex   || '1';
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
