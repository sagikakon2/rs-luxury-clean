import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { KineticText } from '@/components/effects/KineticText';
import { ShimmerButton } from '@/components/effects/ShimmerButton';
import { scrollToSection } from '@/hooks/useSmoothScroll';

const HERO_IMAGES = [
  '/hero/living-room.jpg',
  '/hero/bedroom.jpg',
  '/hero/dining.jpg',
];

const SLIDE_DURATION = 6000;

export const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [advance]);

  useEffect(() => {
    HERO_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <section id="hero" data-dark className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black" style={{ minHeight: '100svh' }}>
      {HERO_IMAGES.map((src, i) => {
        const isActive = i === current;
        return (
          <div
            key={src}
            className="absolute -inset-0.5"
            style={{
              opacity: isActive ? 1 : 0,
              transition: 'opacity 2s ease-in-out',
            }}
          >
            <img
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'brightness(0.35) contrast(0.85) saturate(0.7)',
                transform: isActive ? 'scale(1.14)' : 'scale(1.04)',
                transition: isActive
                  ? 'transform 8s cubic-bezier(0.25, 0.1, 0.25, 1)'
                  : 'transform 3s ease-in',
              }}
              width={1920}
              height={1080}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center gap-8"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-secondary/80 text-xs tracking-[0.3em] uppercase"
        >
          שירותי ניקיון וסידור ברמת יוקרה
        </motion.span>

        <h1
          className="text-white leading-[1.05]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.04em' }}
        >
          <KineticText
            charClassName="text-white"
            delay={0.6}
            stagger={0.035}
          >
            הבית שלכם
          </KineticText>
          <br />
          <KineticText
            charClassName="text-secondary"
            delay={1.1}
            stagger={0.035}
          >
            ראוי ליוקרה
          </KineticText>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.8 }}
          className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed"
          style={{ fontWeight: 300 }}
        >
          צוות מקצועי של עובדות מנוסות, זמינות מיידית, תוצאות שמדברות בעד עצמן
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-4"
        >
          <ShimmerButton
            onClick={() => scrollToSection('#contact')}
            className="text-cta-text text-sm tracking-[0.15em] uppercase px-10 py-4 min-h-[48px] rounded-sm"
            background="var(--color-cta)"
            shimmerColor="rgba(196,181,160,0.1)"
          >
            קבלו הצעת מחיר
          </ShimmerButton>
          <a
            href="https://wa.me/972539300202?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-lift border border-white/30 text-white text-sm tracking-[0.15em] uppercase px-10 py-4 min-h-[48px] cursor-pointer hover:bg-white/10 flex items-center gap-2"
          >
            שלחו הודעה
            <ArrowLeft className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>

    </section>
  );
};
