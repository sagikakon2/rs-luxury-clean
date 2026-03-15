import { Building2, Home, Hammer, FolderOpen } from 'lucide-react';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const SERVICES = [
  {
    icon: Building2,
    title: 'ניקיון משרדים',
    description: 'ניקיון מקצועי ויסודי למשרדים, חללי עבודה ומבנים מסחריים. סביבת עבודה נקייה ומזמינה.',
  },
  {
    icon: Home,
    title: 'משק בית',
    description: 'שירותי משק בית שוטפים לבתים פרטיים. ניקיון, סידור ותחזוקה ברמה הגבוהה ביותר.',
  },
  {
    icon: Hammer,
    title: 'ניקיון לפני ואחרי שיפוץ',
    description: 'ניקיון יסודי של אתרי שיפוץ — הסרת אבק בנייה, שיוף, וניקוי עמוק שמחזיר את הבית לחיים.',
  },
  {
    icon: FolderOpen,
    title: 'סידור ארונות ומזווים',
    description: 'ארגון מקצועי של חללי אחסון — ארונות בגדים, מזווים, מטבחים. מהכאוס לסדר מושלם.',
  },
];

const isTouchDevice = () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (isTouchDevice()) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  };

  return (
    <ScrollReveal delay={index * 0.15} className="h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="service-card glass-card relative p-8 md:p-10 group cursor-default overflow-hidden h-full rounded-2xl"
        style={{ transition: 'transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 0.4s ease' }}
      >
        <div className="service-card-glow" />

        <div className="relative z-10 flex items-start gap-5">
          <motion.div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 relative"
            style={{
              background: 'linear-gradient(135deg, rgba(139,115,85,0.08), rgba(196,181,160,0.12))',
              border: '1px solid rgba(139,115,85,0.1)',
            }}
            whileHover={{ scale: 1.1, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <service.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </motion.div>
          <div>
            <h3
              className="text-text text-xl font-medium mb-3 group-hover:text-primary transition-colors duration-500"
              style={{ letterSpacing: '0.02em' }}
            >
              {service.title}
            </h3>
            <p className="text-text-muted text-base leading-relaxed" style={{ fontWeight: 300 }}>
              {service.description}
            </p>
            <div className="mt-5 h-[2px] w-0 group-hover:w-16 bg-gradient-to-l from-primary/60 to-secondary/40 transition-all duration-700 ease-out" />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export const ServicesSection = () => (
  <section id="services" className="py-32 md:py-40 bg-bg relative">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="gradient-blob w-96 h-96 bg-primary/8 top-20 -end-32" />
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      <ScrollReveal>
        <div className="text-center mb-20">
          <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase block mb-4">
            השירותים שלנו
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium bg-gradient-to-l from-[#1A1714] via-[#8B7355] to-[#1A1714] bg-clip-text text-transparent"
            style={{ letterSpacing: '0.04em', lineHeight: 1.15 }}
          >
            שירותי ניקיון ברמת פרימיום
          </h2>
          <div className="w-12 h-[1px] bg-primary/30 mx-auto mt-6" />
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </div>
  </section>
);
