/* ============================================
   TYPEWRITER EFFECT
   ============================================ */
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const strings = [
    'Frontend Developer',
    'React Specialist',
    'Mobile App Builder',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Full Stack Developer'
  ];

  let stringIndex  = 0;
  let charIndex    = 0;
  let isDeleting   = false;
  let isPaused     = false;

  const TYPING_SPEED  = 90;
  const DELETE_SPEED  = 50;
  const PAUSE_AFTER   = 1800;
  const PAUSE_EMPTY   = 400;

  function type() {
    const current = strings[stringIndex];

    if (!isDeleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isPaused = true;
        setTimeout(() => { isPaused = false; isDeleting = true; type(); }, PAUSE_AFTER);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        setTimeout(type, PAUSE_EMPTY);
        return;
      }
    }

    if (!isPaused) {
      setTimeout(type, isDeleting ? DELETE_SPEED : TYPING_SPEED);
    }
  }

  // Start after loader finishes
  setTimeout(type, 1800);
})();
