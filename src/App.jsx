import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { WhatsAppFAB } from '@/components/ui/WhatsAppFAB';
import { SplashLoader } from '@/components/kinetics/SplashLoader';
import { NavigationBar } from '@/components/sections/NavigationBar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { CtaBandSection } from '@/components/sections/CtaBandSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { ParallaxDivider } from '@/components/sections/ParallaxDivider';
import { InfiniteMarquee } from '@/components/kinetics/InfiniteMarquee';
import { motion } from 'framer-motion';

const MarqueeDivider = () => (
  <div className="border-t border-b border-primary/10 bg-bg-alt/50">
    <InfiniteMarquee
      speed={70}
      gap="3rem"
      className="py-5 text-sm tracking-[0.25em] uppercase text-primary/50 font-medium"
    >
      <span>ניקיון</span>
      <span className="text-secondary/70">·</span>
      <span>סידור</span>
      <span className="text-secondary/70">·</span>
      <span>מקצועיות</span>
      <span className="text-secondary/70">·</span>
      <span>יוקרה</span>
      <span className="text-secondary/70">·</span>
      <span>אמינות</span>
      <span className="text-secondary/70">·</span>
    </InfiniteMarquee>
  </div>
);

const App = () => {
  useSmoothScroll();

  return (
    <>
      <SplashLoader duration={2800} fadeDuration={900}>
        <div className="flex flex-col items-center gap-8">
          <motion.img
            src="/logos/logo-black.png"
            alt="R.S LUXURY CLEAN"
            className="w-28 h-28 md:w-36 md:h-36 object-contain"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-text-muted/60 text-xs tracking-[0.3em] uppercase">
              R.S LUXURY CLEAN
            </p>
            <div className="w-8 h-[1px] bg-primary/30 overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>
      </SplashLoader>

      <ScrollProgress />
      <NavigationBar />
      <main>
        <HeroSection />
        <MarqueeDivider />
        <ServicesSection />
        <ParallaxDivider
          image="/hero/living-room.jpg"
          overlayClass="bg-black/55"
          quote="הניקיון הוא לא רק מה שרואים — זה ההרגשה שנשארת"
        />
        <GallerySection />
        <ParallaxDivider
          image="/hero/bedroom.jpg"
          overlayClass="bg-[#2C2824]/75"
          quote="כל פרט, כל פינה — ברמה שלא מתפשרים עליה"
          author="R.S LUXURY CLEAN"
        />
        <WhyUsSection />
        <CtaBandSection />
        <ContactSection />
      </main>
      <FooterSection />
      <WhatsAppFAB />
    </>
  );
};

export default App;
