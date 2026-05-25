'use client';

import { motion } from 'framer-motion';
import styles from './InitialLoader.module.scss';

interface MandalaRingProps {
  reducedMotion?: boolean;
}

export default function MandalaRing({ reducedMotion }: MandalaRingProps) {
  const animate = reducedMotion
    ? { opacity: 0.6 }
    : { rotate: 360, opacity: [0.35, 0.6, 0.35] };
  const transition = reducedMotion
    ? { duration: 0 }
    : {
        rotate: { duration: 26, ease: 'linear', repeat: Infinity },
        opacity: { duration: 7.5, ease: 'easeInOut', repeat: Infinity },
      };

  return (
    <motion.svg
      className={styles.ring}
      viewBox="0 0 200 200"
      animate={animate}
      transition={transition}
      style={{ transformOrigin: '50% 50%' }}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="72" className={styles.ringOuter} />
      <circle cx="100" cy="100" r="58" className={styles.ringMid} />
      <circle cx="100" cy="100" r="44" className={styles.ringInner} />
      <polygon
        points="100,18 124,76 182,100 124,124 100,182 76,124 18,100 76,76"
        className={styles.ringStar}
      />
      <g className={styles.ringTicks}>
        <line x1="100" y1="10" x2="100" y2="22" />
        <line x1="100" y1="178" x2="100" y2="190" />
        <line x1="10" y1="100" x2="22" y2="100" />
        <line x1="178" y1="100" x2="190" y2="100" />
        <line x1="36" y1="36" x2="44" y2="44" />
        <line x1="164" y1="164" x2="156" y2="156" />
        <line x1="36" y1="164" x2="44" y2="156" />
        <line x1="164" y1="36" x2="156" y2="44" />
      </g>
    </motion.svg>
  );
}
