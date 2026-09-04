/* ============================================
   TECHNICAL BACKGROUND CANVAS
   Renders:
   1. Animated dot-matrix grid with pulsing nodes
   2. Circuit board traces with travelling data packets
   3. Floating binary / hex characters (Matrix-style)
   4. Scan line (CSS) + tech corner brackets (CSS)
   ============================================ */
(function () {

  /* ── Canvas Setup ───────────────────────── */
  const canvas = document.createElement('canvas');
  canvas.id    = 'tech-bg-canvas';
  const ctx    = canvas.getContext('2d');
  document.body.insertBefore(canvas, document.body.firstChild);

  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initAll();
  });

  const GOLD = '251, 191, 36';
  const DIM  = '251, 191, 36';

  /* ══════════════════════════════════════════
     1. DOT-MATRIX GRID
     ══════════════════════════════════════════ */
  const GRID_STEP = 60;
  let dots = [];

  class GridDot {
    constructor(x, y) {
      this.x     = x;
      this.y     = y;
      this.r     = 1.5;
      this.alpha = 0.08 + Math.random() * 0.12;
      this.pulse = Math.random() * Math.PI * 2; // phase
      this.speed = 0.01 + Math.random() * 0.02;
      this.bright = Math.random() > 0.85; // some dots are highlighted
    }

    update() {
      this.pulse += this.speed;
    }

    draw() {
      const glow = this.bright
        ? 0.5 + 0.5 * Math.sin(this.pulse)
        : this.alpha + 0.05 * Math.sin(this.pulse);

      // Highlighted dots get a glow ring
      if (this.bright && glow > 0.7) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD}, ${glow * 0.12})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${GOLD}, ${glow})`;
      ctx.fill();
    }
  }

  function buildGrid() {
    dots = [];
    const cols = Math.ceil(W / GRID_STEP) + 1;
    const rows = Math.ceil(H / GRID_STEP) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push(new GridDot(c * GRID_STEP, r * GRID_STEP));
      }
    }
  }

  /* ══════════════════════════════════════════
     2. CIRCUIT TRACES + DATA PACKETS
     ══════════════════════════════════════════ */
  let circuits = [];

  class Circuit {
    constructor() {
      this.reset();
    }

    reset() {
      // Start from a random grid dot
      const col = Math.floor(Math.random() * Math.ceil(W / GRID_STEP));
      const row = Math.floor(Math.random() * Math.ceil(H / GRID_STEP));
      this.x    = col * GRID_STEP;
      this.y    = row * GRID_STEP;

      // Build a random L-shaped path (horizontal then vertical, or vice versa)
      const dx = (Math.floor(Math.random() * 6) + 2) * GRID_STEP * (Math.random() > 0.5 ? 1 : -1);
      const dy = (Math.floor(Math.random() * 4) + 2) * GRID_STEP * (Math.random() > 0.5 ? 1 : -1);

      this.segments = [
        { x1: this.x, y1: this.y, x2: this.x + dx, y2: this.y },
        { x1: this.x + dx, y1: this.y, x2: this.x + dx, y2: this.y + dy }
      ];

      this.totalLen  = Math.abs(dx) + Math.abs(dy);
      this.progress  = 0; // 0 → 1
      this.speed     = 0.003 + Math.random() * 0.005;
      this.alpha     = 0.35 + Math.random() * 0.4;
      this.trailLen  = 0.18; // fraction of totalLen that glows behind packet
      this.done      = false;
      this.delay     = Math.random() * 3;   // seconds
      this.age       = 0;
    }

    update(dt) {
      this.age += dt;
      if (this.age < this.delay) return;
      this.progress += this.speed;
      if (this.progress >= 1.2) {
        this.reset();
      }
    }

    /* Get XY at fractional progress along the multi-segment path */
    posAt(t) {
      t = Math.max(0, Math.min(1, t));
      const total = this.totalLen;

      // Determine which segment
      let walked = 0;
      for (const seg of this.segments) {
        const segLen = Math.abs(seg.x2 - seg.x1) + Math.abs(seg.y2 - seg.y1);
        const frac   = segLen / total;
        if (t <= walked + frac) {
          const local = (t - walked) / frac;
          return {
            x: seg.x1 + (seg.x2 - seg.x1) * local,
            y: seg.y1 + (seg.y2 - seg.y1) * local
          };
        }
        walked += frac;
      }
      const last = this.segments[this.segments.length - 1];
      return { x: last.x2, y: last.y2 };
    }

    draw() {
      if (this.age < this.delay) return;
      const p      = Math.min(this.progress, 1);
      const pStart = Math.max(0, p - this.trailLen);

      // Draw the lit portion of the trace
      const steps = 30;
      for (let i = 0; i <= steps; i++) {
        const t  = pStart + (p - pStart) * (i / steps);
        const t2 = pStart + (p - pStart) * ((i + 1) / steps);
        if (t2 > 1) break;

        const a = this.posAt(t);
        const b = this.posAt(t2);
        const brightness = i / steps; // head is brightest

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${GOLD}, ${brightness * this.alpha})`;
        ctx.lineWidth   = brightness > 0.85 ? 2 : 1;
        ctx.stroke();
      }

      // Draw the bright data packet (head dot)
      if (p <= 1) {
        const head = this.posAt(p);
        // Outer glow
        const gr = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 10);
        gr.addColorStop(0,   `rgba(${GOLD}, 0.9)`);
        gr.addColorStop(0.4, `rgba(${GOLD}, 0.3)`);
        gr.addColorStop(1,   `rgba(${GOLD}, 0)`);
        ctx.beginPath();
        ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
        // Core
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 180, 1)`;
        ctx.fill();
      }
    }
  }

  function buildCircuits(count) {
    circuits = [];
    for (let i = 0; i < count; i++) {
      circuits.push(new Circuit());
    }
  }

  /* ══════════════════════════════════════════
     3. FLOATING BINARY / HEX CHARACTERS
     ══════════════════════════════════════════ */
  const HEX_CHARS = '0123456789ABCDEF01'.split('');
  const BIN_CHARS = '01'.split('');
  let floaters    = [];

  class FloatingChar {
    constructor() {
      this.reset(true);
    }

    reset(init) {
      const useBin = Math.random() > 0.4;
      const pool   = useBin ? BIN_CHARS : HEX_CHARS;
      this.char  = pool[Math.floor(Math.random() * pool.length)];
      this.x     = Math.random() * W;
      this.y     = init ? Math.random() * H : H + 20;
      this.vy    = -(0.3 + Math.random() * 0.6);  // float upward
      this.alpha = 0.15 + Math.random() * 0.35;
      this.size  = 10 + Math.floor(Math.random() * 8);
      this.life  = 0;
      this.maxLife = 180 + Math.random() * 240;
    }

    update() {
      this.y    += this.vy;
      this.life++;
      // Fade in and out
      if (this.life < 30)  this.opacity = (this.life / 30) * this.alpha;
      else if (this.life > this.maxLife - 30) this.opacity = ((this.maxLife - this.life) / 30) * this.alpha;
      else this.opacity = this.alpha;

      if (this.y < -20) this.reset(false);
    }

    draw() {
      ctx.font         = `${this.size}px 'JetBrains Mono', monospace`;
      ctx.fillStyle    = `rgba(${GOLD}, ${this.opacity || this.alpha})`;
      ctx.fillText(this.char, this.x, this.y);
    }
  }

  function buildFloaters(count) {
    floaters = [];
    for (let i = 0; i < count; i++) floaters.push(new FloatingChar());
  }

  /* ══════════════════════════════════════════
     4. SCAN LINE (canvas version — more control)
     ══════════════════════════════════════════ */
  let scanY = 0;

  function drawScanLine() {
    scanY = (scanY + 0.5) % H;

    const grd = ctx.createLinearGradient(0, 0, W, 0);
    grd.addColorStop(0,   'transparent');
    grd.addColorStop(0.1, `rgba(${GOLD}, 0.0)`);
    grd.addColorStop(0.3, `rgba(${GOLD}, 0.5)`);
    grd.addColorStop(0.5, `rgba(${GOLD}, 0.8)`);
    grd.addColorStop(0.7, `rgba(${GOLD}, 0.5)`);
    grd.addColorStop(0.9, `rgba(${GOLD}, 0.0)`);
    grd.addColorStop(1,   'transparent');

    ctx.beginPath();
    ctx.moveTo(0,  scanY);
    ctx.lineTo(W,  scanY);
    ctx.strokeStyle = grd;
    ctx.lineWidth   = 2;
    ctx.shadowColor = `rgba(${GOLD}, 0.6)`;
    ctx.shadowBlur  = 12;
    ctx.stroke();
    ctx.shadowBlur  = 0;
  }

  /* ══════════════════════════════════════════
     5. CORNER TECH BRACKETS (DOM elements)
     ══════════════════════════════════════════ */
  function addCorners() {
    ['tl','tr','bl','br'].forEach(pos => {
      if (document.querySelector(`.tech-corner--${pos}`)) return;
      const el = document.createElement('div');
      el.className = `tech-corner tech-corner--${pos}`;
      document.body.appendChild(el);
    });
  }

  /* ══════════════════════════════════════════
     6. INIT & ANIMATE
     ══════════════════════════════════════════ */
  function initAll() {
    buildGrid();
    buildCircuits(12);
    buildFloaters(40);
  }

  let last = 0;

  function animate(ts) {
    const dt = (ts - last) / 1000;
    last = ts;

    ctx.clearRect(0, 0, W, H);

    // 1. Dot grid
    dots.forEach(d => { d.update(); d.draw(); });

    // 2. Circuits
    circuits.forEach(c => { c.update(dt); c.draw(); });

    // 3. Floating chars
    floaters.forEach(f => { f.update(); f.draw(); });

    // 4. Scan line
    drawScanLine();

    requestAnimationFrame(animate);
  }

  window.addEventListener('load', () => {
    initAll();
    addCorners();
    requestAnimationFrame(animate);
  });

})();
