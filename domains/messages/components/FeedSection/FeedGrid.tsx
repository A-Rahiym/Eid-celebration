import type { ReactNode } from 'react';
import styles from './FeedSection.module.scss';

interface FeedGridProps {
  children: ReactNode;
  isBusy?: boolean;
}

export default function FeedGrid({ children, isBusy }: FeedGridProps) {
  return (
    <div
      className={styles.grid}
      role="feed"
      aria-label="Eid wishes from around the world"
      aria-busy={isBusy || undefined}
    >
      {children}
    </div>
  );
}
