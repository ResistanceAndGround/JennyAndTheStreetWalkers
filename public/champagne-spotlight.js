/* Progressive enhancement: readable solid text before and after one entrance. */
(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const headings = document.querySelectorAll('.champagne-spotlight');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (motion.matches) continue;
      entry.target.classList.add('is-spotlit');
      entry.target.addEventListener('animationend', () => {
        entry.target.classList.remove('is-spotlit');
      }, { once: true });
    }
  }, { threshold: 0.6 });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    if (!motion.matches) headings.forEach(heading => observer.observe(heading));
  });
  motion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    headings.forEach(heading => heading.classList.remove('is-spotlit'));
  });
})();
