import { ArrowLeft } from 'lucide-react';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { ShimmerButton } from '@/components/effects/ShimmerButton';
import { scrollToSection } from '@/hooks/useSmoothScroll';

export const CtaBandSection = () => {
  const scrollTo = () => scrollToSection('#contact');

  return (
    <section className="py-24 md:py-32 bg-cta relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="gradient-blob w-96 h-96 bg-primary/10 -top-32 -end-32" />
        <div className="gradient-blob w-80 h-80 bg-secondary/8 bottom-10 -start-24" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <ScrollReveal>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 bg-gradient-to-l from-[#F5F3F0] via-[#C4B5A0] to-[#F5F3F0] bg-clip-text text-transparent"
            style={{ letterSpacing: '0.04em', lineHeight: 1.15 }}
          >
            מוכנים לחוויית ניקיון אחרת?
          </h2>
          <p className="text-cta-text/60 text-lg mb-10 max-w-xl mx-auto" style={{ fontWeight: 300 }}>
            צרו קשר עוד היום וקבלו הצעת מחיר מותאמת אישית. הצוות שלנו מחכה לכם.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ShimmerButton
              onClick={scrollTo}
              className="text-cta text-sm tracking-[0.15em] uppercase px-10 py-4 min-h-[48px]"
              background="var(--color-cta-text)"
              shimmerColor="rgba(139,115,85,0.2)"
            >
              צרו קשר
            </ShimmerButton>
            <a
              href="tel:0539300202"
              className="border border-cta-text/30 text-cta-text text-sm tracking-[0.15em] uppercase px-10 py-4 min-h-[48px] cursor-pointer hover:bg-cta-text/10 transition-colors flex items-center gap-2"
            >
              053-930-0202
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
