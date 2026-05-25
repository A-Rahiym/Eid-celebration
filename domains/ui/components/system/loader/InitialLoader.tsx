'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './InitialLoader.module.scss';
import CrescentMark from './CrescentMark';
import MandalaRing from './MandalaRing';
import AmbientParticles from './AmbientParticles';

interface InitialLoaderProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullHeight?: boolean;
  className?: string;
}

export default function InitialLoader({
  label = 'Celebrating together ✨',
  size = 'md',
  fullHeight = false,
  className,
}: InitialLoaderProps) {
  const reducedMotion = !!useReducedMotion();
  const wrapperClasses = [
    styles.loader,
    styles[size],
    fullHeight && styles.fullHeight,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      className={wrapperClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      role="status"
      aria-live="polite"
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
    >
      <div className={styles.core}>
        <motion.div
          className={styles.glow}
          animate={reducedMotion ? { opacity: 0.5 } : { opacity: [0.35, 0.6, 0.35], scale: [0.98, 1.02, 0.98] }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <MandalaRing reducedMotion={reducedMotion} />
        <CrescentMark />
        <AmbientParticles reducedMotion={reducedMotion} />
      </div>
      {label && <div className={styles.label}>{label}</div>}
    </motion.div>
  );
}
