import type { ReactNode } from 'react';
import styles from './FeedSection.module.scss';

interface FeedGridProps {
  children: ReactNode;
}

export default function FeedGrid({ children }: FeedGridProps) {
  return (
    <div className={styles.grid} role="feed" aria-label="Eid wishes from around the world">
      {children}
    </div>
  );
}
