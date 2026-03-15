export const getLenis = () => null;

export const scrollToSection = (target) => {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 100;
  window.scrollTo({ top, behavior: 'smooth' });
};

export const useSmoothScroll = () => {};
