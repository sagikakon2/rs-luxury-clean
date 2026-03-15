import { motion, useScroll } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-primary origin-right z-[60]"
    />
  );
};
