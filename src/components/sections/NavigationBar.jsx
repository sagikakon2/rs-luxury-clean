import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShimmerButton } from '@/components/effects/ShimmerButton';
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
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.008 0.008"
        numOctaves="2"
        seed="92"
        result="noise"
      />
      <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="blurred"
        scale="50"
        xChannelSelector="R"
        yChannelSelector="G"
        result="displaced"
      />
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
            transition: 'max-width 0.5s cubic-bezier(0.4,0,0.2,1), padding 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <header
            className={`relative overflow-hidden ${scrolled ? 'lg-shell rounded-2xl' : ''}`}
            style={{
              boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.05)' : 'none',
              transition: 'box-shadow 0.5s ease, border-radius 0.3s ease',
            }}
          >
            {scrolled && (
              <>
                {hasDistortion && (
                  <div
                    className="lg-filter lg-fade-in"
                    style={{
                      backdropFilter: 'blur(0.5px)',
                      WebkitBackdropFilter: 'blur(0.5px)',
                      filter: 'url(#lg-dist)',
                    }}
                  />
                )}
                <div className={`${hasDistortion ? 'lg-frost' : 'lg-frost-strong'} lg-fade-in`} />
                <div className="lg-specular lg-fade-in" />
              </>
            )}

            {!scrolled && (
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
            )}

            <nav className="lg-content w-full px-6 md:px-8 flex items-center justify-between h-16 md:h-[64px]">
              <button onClick={() => scrollTo('#hero')} className="shrink-0 cursor-pointer relative h-12 w-12">
                <img
                  src="/logos/logo-white.png"
                  alt="R.S LUXURY CLEAN"
                  width={48}
                  height={48}
                  className={`absolute inset-0 h-12 w-auto object-contain transition-opacity duration-500 ${
                    scrolled ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <img
                  src="/logos/logo-black.png"
                  alt="R.S LUXURY CLEAN"
                  width={48}
                  height={48}
                  className={`absolute inset-0 h-12 w-auto object-contain transition-opacity duration-500 ${
                    scrolled ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>

              <ul className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className={`text-[13px] tracking-[0.08em] font-medium transition-colors duration-300 cursor-pointer ${
                        scrolled ? 'text-text hover:text-primary' : 'text-white hover:text-secondary'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="hidden md:block">
                {scrolled ? (
                  <ShimmerButton
                    onClick={() => scrollTo('#contact')}
                    className="text-xs tracking-[0.15em] uppercase px-6 py-2.5 min-h-[44px] rounded-xl"
                    background="var(--color-cta)"
                    shimmerColor="rgba(196,181,160,0.15)"
                  >
                    <span className="text-cta-text">קבלו הצעת מחיר</span>
                  </ShimmerButton>
                ) : (
                  <button
                    onClick={() => scrollTo('#contact')}
                    className="text-xs tracking-[0.15em] uppercase px-6 py-2.5 transition-all cursor-pointer min-h-[44px] border border-white/30 text-white hover:bg-white/10 rounded-xl"
                  >
                    קבלו הצעת מחיר
                  </button>
                )}
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer ${
                  scrolled ? 'text-text' : 'text-white'
                }`}
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
                  <div className={`lg-content px-6 py-6 flex flex-col gap-5 border-t ${
                    scrolled ? 'border-white/10' : 'border-white/15'
                  }`}>
                    {NAV_LINKS.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => scrollTo(link.href)}
                        className={`text-start text-lg font-medium transition-colors cursor-pointer ${
                          scrolled ? 'text-text hover:text-primary' : 'text-white hover:text-secondary'
                        }`}
                      >
                        {link.label}
                      </button>
                    ))}
                    <button
                      onClick={() => scrollTo('#contact')}
                      className="bg-cta text-cta-text text-sm tracking-[0.15em] uppercase px-8 py-4 mt-1 cursor-pointer min-h-[48px] rounded-xl"
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
