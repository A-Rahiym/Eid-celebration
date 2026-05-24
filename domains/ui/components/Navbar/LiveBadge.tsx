'use client';

import { formatCount } from '@/lib/utils';
import styles from './Navbar.module.scss';

interface LiveBadgeProps {
  liveCount: number;
}

export default function LiveBadge({ liveCount }: LiveBadgeProps) {
  return (
    <div className={styles.navRight}>
      <div className={styles.liveBadge} aria-live="polite">
        <div className={styles.pulse} aria-hidden="true" />
        <span>Live</span>
      </div>
      <div className={styles.countBlock}>
        <span className={styles.countNum}>{formatCount(liveCount)}</span>
        <span className={styles.countLabel}>celebrating now</span>
      </div>
    </div>
  );
}
