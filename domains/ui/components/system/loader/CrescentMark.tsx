'use client';

import { useId } from 'react';
import styles from './InitialLoader.module.scss';

interface CrescentMarkProps {
  className?: string;
}

export default function CrescentMark({ className }: CrescentMarkProps) {
  const maskId = useId();
  const maskUrl = `url(#${maskId})`;

  return (
    <svg
      className={[styles.crescent, className].filter(Boolean).join(' ')}
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect width="120" height="120" fill="white" />
          <circle cx="68" cy="50" r="26" fill="black" />
        </mask>
      </defs>
      <circle cx="54" cy="58" r="28" fill="var(--loader-crescent)" mask={maskUrl} />
      <circle cx="60" cy="62" r="32" fill="none" stroke="var(--loader-crescent-soft)" strokeWidth="0.8" />
    </svg>
  );
}
