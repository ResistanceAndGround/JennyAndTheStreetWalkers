(() => {
  const carousel = document.querySelector('.home-slideshow');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.home-slide')];
  const controls = carousel.querySelector('.home-slideshow-controls');
  const toggle = carousel.querySelector('[data-slide="toggle"]');
  const count = carousel.querySelector('.slide-count');
  const announcement = carousel.querySelector('.slideshow-announcement');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Keep light on the actual artwork, including when portrait and landscape slides mix.
  function sizeArtworkLight() {
    slides.forEach(slide => {
      const image = slide.querySelector('img');
      const bounds = image.getBoundingClientRect();
      const parent = slide.getBoundingClientRect();
      slide.style.setProperty('--art-left', `${bounds.left - parent.left}px`);
      slide.style.setProperty('--art-top', `${bounds.top - parent.top}px`);
      slide.style.setProperty('--art-width', `${bounds.width}px`);
      slide.style.setProperty('--art-height', `${bounds.height}px`);
    });
  }
  slides.forEach(slide => slide.querySelector('img').addEventListener('load', sizeArtworkLight));
  if ('ResizeObserver' in window) {
    new ResizeObserver(sizeArtworkLight).observe(carousel.querySelector('.home-slideshow-frame'));
  } else {
    window.addEventListener('resize', sizeArtworkLight);
  }
  sizeArtworkLight();
  let current = 0;
  let timer;
  let paused = false;
  let hovered = false;
  let focused = false;
  function schedule() {
    clearTimeout(timer);
    if (!paused && !hovered && !focused && !document.hidden && !motion.matches) {
      timer = setTimeout(() => show(current + 1, false), 7500);
    }
  }
  function show(index, manual = true) {
    const next = (index + slides.length) % slides.length;
    const image = slides[next].querySelector('img');
    if (!image.complete || !image.naturalWidth) { schedule(); return; }
    slides[current].classList.remove('is-active');
    slides[current].setAttribute('aria-hidden', 'true');
    current = next;
    slides[current].classList.add('is-active');
    slides[current].setAttribute('aria-hidden', 'false');
    count.textContent = `${current + 1} / ${slides.length}`;
    if (manual) announcement.textContent = `Photograph ${current + 1} of ${slides.length}: ${image.alt}`;
    schedule();
  }
  function updateToggle() {
    toggle.disabled = motion.matches;
    toggle.textContent = motion.matches ? 'Auto-play off' : paused ? 'Play slideshow' : 'Pause slideshow';
    toggle.setAttribute('aria-label', motion.matches ? 'Automatic slideshow disabled for reduced motion' : toggle.textContent);
    schedule();
  }
  carousel.querySelector('[data-slide="previous"]').addEventListener('click', () => show(current - 1));
  carousel.querySelector('[data-slide="next"]').addEventListener('click', () => show(current + 1));
  toggle.addEventListener('click', () => { paused = !paused; updateToggle(); });
  carousel.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', () => { focused = true; schedule(); });
  carousel.addEventListener('focusout', () => {
    setTimeout(() => { focused = carousel.contains(document.activeElement); schedule(); }, 0);
  });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', updateToggle);
  controls.hidden = false;
  updateToggle();
})();
