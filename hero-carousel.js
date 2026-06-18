/* =========================================================
   Hero Story Carousel
   Auto-advances every 5 s; supports prev / next / pause
   ========================================================= */

(function () {
  const INTERVAL = 2500; // ms between slides

  const track   = document.getElementById('hero-carousel-track');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');
  const btnPause= document.getElementById('carousel-pause');
  const dots    = document.querySelectorAll('.carousel-dot');

  if (!track) return;

  const slides = Array.from(track.children);
  let current  = 0;
  let paused   = false;
  let timer    = null;

  /* ── helpers ─────────────────────────────────────────── */
  function goTo(index) {
    slides[current].classList.remove('is-active');
    dots[current]?.classList.remove('is-active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('is-active');
    dots[current]?.classList.add('is-active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function togglePause() {
    paused = !paused;
    btnPause.setAttribute('aria-label', paused ? 'Resume carousel' : 'Pause carousel');
    btnPause.classList.toggle('is-paused', paused);
    // swap icon
    btnPause.innerHTML = paused ? pauseIcons.play : pauseIcons.pause;
    paused ? stopTimer() : startTimer();
  }

  /* icon SVGs */
  const pauseIcons = {
    pause: `<svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
              <rect x="3" y="2" width="3.5" height="12" rx="1"/>
              <rect x="9.5" y="2" width="3.5" height="12" rx="1"/>
            </svg>`,
    play:  `<svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
              <path d="M4 2.5l10 5.5-10 5.5V2.5z"/>
            </svg>`,
  };

  /* ── init ────────────────────────────────────────────── */
  btnPause.innerHTML = pauseIcons.pause;

  btnNext.addEventListener('click',  () => { next(); if (!paused) startTimer(); });
  btnPrev.addEventListener('click',  () => { prev(); if (!paused) startTimer(); });
  btnPause.addEventListener('click', togglePause);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); if (!paused) startTimer(); });
  });

  /* keyboard support */
  [btnPrev, btnNext, btnPause].forEach(btn => {
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  /* start */
  goTo(0);
  startTimer();
})();