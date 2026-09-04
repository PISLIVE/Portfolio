/* ============================================
   BACKGROUND EFFECTS — Floating shapes &
   Shooting stars spawner
   ============================================ */
(function () {

  /* ── Floating Geometric Shapes ──────────── */
  const SHAPES = ['circle', 'diamond'];
  const SIZES  = [20, 30, 40, 50, 60, 80];

  function spawnShape() {
    const shape = document.createElement('div');
    const type  = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const size  = SIZES[Math.floor(Math.random() * SIZES.length)];

    shape.className = `geo-shape geo-shape--${type}`;
    shape.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${Math.random() * 100}vw;
      bottom: -80px;
      border-radius: ${type === 'circle' ? '50%' : type === 'diamond' ? '4px' : '0'};
      animation-duration: ${18 + Math.random() * 22}s;
      animation-delay:    ${Math.random() * 8}s;
      transform: ${type === 'diamond' ? 'rotate(45deg)' : 'rotate(0deg)'};
    `;

    document.body.appendChild(shape);

    // Remove after animation
    const dur = parseFloat(shape.style.animationDuration) * 1000 +
                parseFloat(shape.style.animationDelay)    * 1000;
    setTimeout(() => shape.remove(), dur + 500);
  }

  // Spawn shapes periodically
  function startShapes() {
    // Initial batch
    for (let i = 0; i < 6; i++) {
      setTimeout(spawnShape, i * 2000);
    }
    // Continuous spawn
    setInterval(spawnShape, 4000);
  }


  /* ── Shooting Stars ─────────────────────── */
  function spawnShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.cssText = `
      top:  ${Math.random() * 50}vh;
      left: ${60 + Math.random() * 40}vw;
      animation: shoot ${0.8 + Math.random() * 0.8}s ease-out forwards;
    `;

    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
  }

  function startShootingStars() {
    // Fire randomly every 4–10 seconds
    function schedule() {
      const delay = 4000 + Math.random() * 6000;
      setTimeout(() => {
        spawnShootingStar();
        // Sometimes fire a quick double
        if (Math.random() > 0.6) {
          setTimeout(spawnShootingStar, 300 + Math.random() * 300);
        }
        schedule();
      }, delay);
    }
    schedule();
  }


  /* ── Enhanced Particle Config ───────────── */
  // Boost the existing particle canvas opacity
  window.addEventListener('load', () => {
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
      canvas.style.opacity = '0.55';
    }
  });


  /* ── Animated gradient background mesh ──── */
  function createGradientMesh() {
    const mesh = document.createElement('div');
    mesh.id = 'gradient-mesh';
    mesh.style.cssText = `
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background:
        radial-gradient(ellipse 40% 30% at 10% 10%, rgba(251,191,36,0.04) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 90% 90%, rgba(217,119,6,0.04) 0%, transparent 60%),
        radial-gradient(ellipse 35% 25% at 80% 20%, rgba(251,191,36,0.03) 0%, transparent 60%);
      animation: mesh-drift 20s ease-in-out infinite alternate;
    `;
    document.body.insertBefore(mesh, document.body.firstChild);
  }

  /* Add mesh drift keyframes via JS (so no extra CSS file needed) */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes mesh-drift {
      0%   {
        background:
          radial-gradient(ellipse 40% 30% at 10% 10%, rgba(251,191,36,0.04) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 90% 90%, rgba(217,119,6,0.04) 0%, transparent 60%),
          radial-gradient(ellipse 35% 25% at 80% 20%, rgba(251,191,36,0.03) 0%, transparent 60%);
      }
      50%  {
        background:
          radial-gradient(ellipse 50% 40% at 20% 80%, rgba(251,191,36,0.05) 0%, transparent 60%),
          radial-gradient(ellipse 40% 30% at 75% 15%, rgba(217,119,6,0.04) 0%, transparent 60%),
          radial-gradient(ellipse 45% 35% at 50% 50%, rgba(251,191,36,0.03) 0%, transparent 60%);
      }
      100% {
        background:
          radial-gradient(ellipse 45% 35% at 80% 30%, rgba(251,191,36,0.04) 0%, transparent 60%),
          radial-gradient(ellipse 35% 25% at 15% 75%, rgba(217,119,6,0.05) 0%, transparent 60%),
          radial-gradient(ellipse 40% 30% at 60% 85%, rgba(251,191,36,0.03) 0%, transparent 60%);
      }
    }

    @keyframes shoot {
      0%   { transform: translateX(0) translateY(0) scaleX(1); opacity: 1; }
      100% { transform: translateX(-500px) translateY(250px) scaleX(0.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  /* ── Boot all effects ───────────────────── */
  window.addEventListener('load', () => {
    createGradientMesh();
    setTimeout(startShapes, 1000);
    setTimeout(startShootingStars, 3000);
  });

})();
