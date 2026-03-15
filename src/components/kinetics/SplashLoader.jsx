import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SplashLoader = ({
  duration = 2800,
  fadeDuration = 900,
  children,
}) => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem('splash_shown');
  });

  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = 'hidden';
    sessionStorage.setItem('splash_shown', '1');

    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [visible, duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeDuration / 1000, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: '#F5F3F0' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
