import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '@/hooks/useSmoothScroll';

const NAV_LINKS = [
  { label: 'שירותים', href: '#services' },
  { label: 'עבודות', href: '#gallery' },
  { label: 'למה אנחנו', href: '#why-us' },
  { label: 'צור קשר', href: '#contact' },
];

const LiquidGlassSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }} aria-hidden="true">
    <filter id="lg-dist" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
      <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
      <feDisplacementMap in="SourceGraphic" in2="blurred" scale="50" xChannelSelector="R" yChannelSelector="G" result="displaced" />
      <feGaussianBlur in="displaced" stdDeviation="3" />
    </filter>
  </svg>
);

const useIsDesktopChrome = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
    const isChromium = !!(window.chrome) || /Chrome\//.test(ua);
    setIsDesktop(!isMobile && isChromium);
  }, []);
  return isDesktop;
};

const ease = 'cubic-bezier(0.4, 0, 0.2, 1)';
const t = `all 0.6s ${ease}`;

export const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hasDistortion = useIsDesktopChrome();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <LiquidGlassSVG />

      <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        <div
          className="pointer-events-auto"
          style={{
            maxWidth: scrolled ? '56rem' : '100%',
            margin: '0 auto',
            padding: scrolled ? '10px 16px 0' : '0',
            transition: t,
          }}
        >
          <header
            className="lg-shell relative overflow-hidden"
            style={{
              borderRadius: scrolled ? '1rem' : '0',
              boxShadow: scrolled
                ? '0 8px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.05)'
                : '0 0 0 0 transparent',
              transition: t,
            }}
          >
            {/* Dark gradient — fades out when scrolled */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"
              style={{ opacity: scrolled ? 0 : 1, transition: `opacity 0.6s ${ease}` }}
            />

            {/* Glass layers — always mounted, crossfade */}
            {hasDistortion && (
              <div
                className="lg-filter"
                style={{
                  opacity: scrolled ? 1 : 0,
                  visibility: scrolled ? 'visible' : 'hidden',
                  transition: t,
                  backdropFilter: 'blur(0.5px)',
                  WebkitBackdropFilter: 'blur(0.5px)',
                  filter: 'url(#lg-dist)',
                }}
              />
            )}
            <div
              className={hasDistortion ? 'lg-frost' : 'lg-frost-strong'}
              style={{ opacity: scrolled ? 1 : 0, visibility: scrolled ? 'visible' : 'hidden', transition: t }}
            />
            <div
              className="lg-specular"
              style={{ opacity: scrolled ? 1 : 0, visibility: scrolled ? 'visible' : 'hidden', transition: t }}
            />

            <nav className="lg-content w-full px-6 md:px-8 flex items-center justify-between h-16 md:h-[64px] relative">
              {/* Logo crossfade */}
              <button onClick={() => scrollTo('#hero')} className="shrink-0 cursor-pointer relative h-12 w-12">
                <img src="/logos/logo-white.png" alt="R.S LUXURY CLEAN" width={48} height={48}
                  className="absolute inset-0 h-12 w-auto object-contain"
                  style={{ opacity: scrolled ? 0 : 1, transition: `opacity 0.6s ${ease}` }}
                />
                <img src="/logos/logo-black.png" alt="R.S LUXURY CLEAN" width={48} height={48}
                  className="absolute inset-0 h-12 w-auto object-contain"
                  style={{ opacity: scrolled ? 1 : 0, transition: `opacity 0.6s ${ease}` }}
                />
              </button>

              {/* Nav links — color transitions via inline style */}
              <ul className="hidden md:flex items-center gap-8 absolute inset-x-0 justify-center pointer-events-none">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="nav-link text-[13px] tracking-[0.08em] font-medium cursor-pointer pointer-events-auto"
                      style={{
                        color: scrolled ? 'var(--color-text)' : '#fff',
                        transition: `color 0.5s ${ease}`,
                      }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* CTA — single element, style-transitioned */}
              <div className="hidden md:block">
                <button
                  onClick={() => scrollTo('#contact')}
                  className="shine text-xs tracking-[0.15em] uppercase px-6 py-2.5 min-h-[44px] rounded-xl cursor-pointer"
                  style={{
                    background: scrolled ? 'var(--color-cta)' : 'transparent',
                    color: scrolled ? 'var(--color-cta-text)' : '#fff',
                    border: scrolled ? '1px solid transparent' : '1px solid rgba(255,255,255,0.3)',
                    '--shine-color': scrolled ? 'rgba(196,181,160,0.07)' : 'rgba(255,255,255,0.05)',
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
                style={{ color: scrolled ? 'var(--color-text)' : '#fff', transition: `color 0.5s ${ease}` }}
                aria-label="תפריט"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </nav>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="lg-content px-6 py-6 flex flex-col gap-5 border-t"
                    style={{ borderColor: scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)' }}>
                    {NAV_LINKS.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => scrollTo(link.href)}
                        className="nav-link text-start text-lg font-medium cursor-pointer"
                        style={{ color: scrolled ? 'var(--color-text)' : '#fff', transition: `color 0.5s ${ease}` }}
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
    </>
  );
};
