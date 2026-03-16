import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '@/hooks/useSmoothScroll';

const NAV_LINKS = [
  { label: 'שירותים', href: '#services' },
  { label: 'עבודות', href: '#gallery' },
  { label: 'למה אנחנו', href: '#why-us' },
  { label: 'צור קשר', href: '#contact' },
];


const ease = 'cubic-bezier(0.4, 0, 0.2, 1)';
const t = `all 0.6s ${ease}`;

export const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lightBg, setLightBg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const isMobile = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    isMobile.current = mq.matches;
    const onMqChange = (e) => { isMobile.current = e.matches; };
    mq.addEventListener('change', onMqChange);
    return () => mq.removeEventListener('change', onMqChange);
  }, []);

  useEffect(() => {
    const getSections = () =>
      Array.from(document.querySelectorAll('section, footer, [data-dark]'));

    let lastY = window.scrollY;

    const detectBg = () => {
      setScrolled(window.scrollY > 50);
      // Close mobile menu on real scroll (not touch jitter)
      if (Math.abs(window.scrollY - lastY) > 10) setMenuOpen(false);
      lastY = window.scrollY;

      const probeY = window.scrollY + 36;
      const sections = getSections();

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (probeY >= top && probeY < bottom) {
          setLightBg(!sec.hasAttribute('data-dark'));
          return;
        }
      }
      setLightBg(true);
    };

    window.addEventListener('scroll', detectBg, { passive: true });
    detectBg();
    return () => window.removeEventListener('scroll', detectBg);
  }, []);

  // Close mobile menu on touch outside
  useEffect(() => {
    if (!menuOpen) return;
    const onTouch = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('touchstart', onTouch, { passive: true });
    document.addEventListener('mousedown', onTouch);
    return () => {
      document.removeEventListener('touchstart', onTouch);
      document.removeEventListener('mousedown', onTouch);
    };
  }, [menuOpen]);

  const scrollTo = (href) => {
    setMenuOpen(false);
    scrollToSection(href);
  };

  // Mobile always shows "scrolled" (glass) state
  const active = scrolled || isMobile.current;
  const textColor = lightBg ? 'var(--color-text)' : '#fff';

  return (
      <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        <div
          className="pointer-events-auto"
          style={{
            maxWidth: active ? '64rem' : '100%',
            margin: '0 auto',
            padding: active ? '12px 16px 0' : '0',
            transition: t,
          }}
        >
          <header
            ref={headerRef}
            className="lg-shell relative overflow-hidden"
            style={{
              borderRadius: active ? '1.25rem' : '0',
              boxShadow: active
                ? '0 6px 16px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)'
                : '0 0 0 0 transparent',
              transition: t,
            }}
          >
            {/* Dark gradient — fades out when active */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"
              style={{ opacity: active ? 0 : 1, transition: `opacity 0.6s ${ease}` }}
            />

            {/* Glass layers — always mounted, CSS handles mobile/desktop */}
            <div
              className="lg-filter"
              style={{ opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden', transition: t }}
            />
            <div
              className="lg-frost"
              style={{ opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden', transition: t }}
            />
            <div
              className="lg-specular"
              style={{ opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden', transition: t }}
            />

            <nav className="lg-content w-full flex items-center justify-between relative"
              style={{ height: active ? '72px' : '64px', padding: active ? '0 2rem' : '0 1.5rem', transition: t }}>
              {/* Logo crossfade */}
              <button onClick={() => scrollTo('#hero')} className="shrink-0 cursor-pointer relative h-12 w-12">
                <img src="/logos/logo-white.png" alt="R.S LUXURY CLEAN" width={48} height={48}
                  className="absolute inset-0 h-12 w-auto object-contain"
                  style={{ opacity: lightBg ? 0 : 1, transition: `opacity 0.6s ${ease}` }}
                />
                <img src="/logos/logo-black.png" alt="R.S LUXURY CLEAN" width={48} height={48}
                  className="absolute inset-0 h-12 w-auto object-contain"
                  style={{ opacity: lightBg ? 1 : 0, transition: `opacity 0.6s ${ease}` }}
                />
              </button>

              {/* Nav links */}
              <ul className="hidden md:flex items-center gap-8 absolute inset-x-0 justify-center pointer-events-none">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="nav-link text-[13px] tracking-[0.08em] font-medium cursor-pointer pointer-events-auto"
                      style={{ color: textColor, transition: `color 0.5s ${ease}` }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="hidden md:block">
                <button
                  onClick={() => scrollTo('#contact')}
                  className="shine text-xs tracking-[0.15em] uppercase px-6 py-2.5 min-h-[44px] cursor-pointer"
                  style={{
                    borderRadius: active ? '2rem' : '0.75rem',
                    background: active ? 'var(--color-cta)' : 'transparent',
                    color: active ? 'var(--color-cta-text)' : '#fff',
                    border: active ? '1px solid transparent' : '1px solid rgba(255,255,255,0.3)',
                    '--shine-color': active ? 'rgba(196,181,160,0.07)' : 'rgba(255,255,255,0.05)',
                    transition: `background 0.5s ${ease}, color 0.5s ${ease}, border-color 0.5s ${ease}, transform 0.4s ${ease}`,
                  }}
                >
                  קבלו הצעת מחיר
                </button>
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                style={{ color: textColor, transition: `color 0.5s ${ease}` }}
                aria-label="תפריט"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </nav>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="lg-content px-6 py-6 flex flex-col gap-5">
                    {NAV_LINKS.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => scrollTo(link.href)}
                        className="nav-link text-start text-lg font-medium cursor-pointer"
                        style={{ color: textColor, transition: `color 0.5s ${ease}` }}
                      >
                        {link.label}
                      </button>
                    ))}
                    <button
                      onClick={() => scrollTo('#contact')}
                      className="bg-cta text-cta-text text-sm tracking-[0.15em] uppercase px-8 py-4 mt-1 cursor-pointer min-h-[48px] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all duration-300"
                    >
                      קבלו הצעת מחיר
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </header>
        </div>
      </div>
  );
};
