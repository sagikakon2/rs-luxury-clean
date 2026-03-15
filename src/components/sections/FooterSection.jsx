import { Phone, Mail, ArrowUp } from 'lucide-react';
import { scrollToSection } from '@/hooks/useSmoothScroll';

const FOOTER_LINKS = [
  { label: 'שירותים', href: '#services' },
  { label: 'עבודות', href: '#gallery' },
  { label: 'למה אנחנו', href: '#why-us' },
  { label: 'צור קשר', href: '#contact' },
];

export const FooterSection = () => {
  const scrollTo = (href) => scrollToSection(href);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-cta text-cta-text relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <img src="/logos/logo-white.png" alt="R.S LUXURY CLEAN" className="h-14 w-auto mb-6" width={140} height={56} />
            <p className="text-cta-text/50 text-sm leading-relaxed max-w-xs" style={{ fontWeight: 300 }}>
              שירותי ניקיון וסידור ברמת יוקרה.
              <br />
              צוות מקצועי, זמינות מיידית, אזור המרכז.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-cta-text/40 mb-6">ניווט</h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-cta-text/70 text-sm hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-cta-text/40 mb-6">פרטי קשר</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:0539300202" className="flex items-center gap-3 text-cta-text/70 hover:text-primary transition-colors cursor-pointer text-sm">
                <Phone className="w-4 h-4" strokeWidth={1} />
                053-930-0202
              </a>
              <a href="mailto:rsclean21@gmail.com" className="flex items-center gap-3 text-cta-text/70 hover:text-primary transition-colors cursor-pointer text-sm">
                <Mail className="w-4 h-4" strokeWidth={1} />
                rsclean21@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cta-text/10 mt-12 pt-8 flex items-center justify-between">
          <p className="text-cta-text/30 text-xs tracking-[0.1em]">
            &copy; {new Date().getFullYear()} R.S LUXURY CLEAN. כל הזכויות שמורות.
          </p>
          <button
            onClick={backToTop}
            className="btn-outline-lift w-11 h-11 rounded-xl flex items-center justify-center text-cta-text/50 hover:text-primary cursor-pointer"
            style={{
              background: 'rgba(245,243,240,0.08)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            aria-label="חזרה למעלה"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
