import { motion } from 'framer-motion';

const isTouchDevice =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const MobileKineticText = ({ children, className = '', charClassName, delay = 0, as: Tag = 'span' }) => (
  <Tag className={className}>
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={charClassName}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.span>
  </Tag>
);

const DesktopKineticText = ({ children, className = '', charClassName, delay = 0, stagger = 0.04, as: Tag = 'span' }) => (
  <Tag className={className}>
    {children.split('').map((char, i) => (
      <motion.span
        key={`${i}-${char}`}
        initial={{ y: '110%', opacity: 0, rotateX: -60 }}
        whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: delay + i * stagger, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={charClassName}
        style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </Tag>
);

export const KineticText = (props) =>
  isTouchDevice ? <MobileKineticText {...props} /> : <DesktopKineticText {...props} />;
