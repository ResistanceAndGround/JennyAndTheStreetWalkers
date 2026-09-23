/* Animate only after enhancement succeeds; no hidden waiting state. */
(() => {
  const showcase = document.querySelector('.champagne-showcase');
  if (!showcase) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !window.CSS || !('registerProperty' in CSS)) return;
  let started = false;
  let observer;
  const reveal = () => {
    if (started || motion.matches) return;
    started = true;
    observer?.disconnect();
    showcase.classList.add('is-entering');
    showcase.querySelector('.champagne-photo-frame').addEventListener('animationend', event => {
      if (event.animationName === 'champagne-perimeter-fill') showcase.classList.remove('is-entering');
    });
  };
  const ready = () => {
    if (motion.matches) return;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) reveal();
      }, { threshold: 0.2 });
      observer.observe(showcase);
    } else reveal();
  };
  const photo = showcase.querySelector('.champagne-photo-frame img');
  if (photo.complete) ready();
  else photo.addEventListener('load', ready, { once: true });
  motion.addEventListener('change', event => {
    if (!event.matches) return;
    started = true;
    observer?.disconnect();
    showcase.classList.remove('is-entering');
  });
})();
