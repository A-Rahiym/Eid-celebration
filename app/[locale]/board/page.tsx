'use client';

import FeedSection from '@/domains/messages/components/FeedSection/FeedSection';
import { useCelebrationStore } from '@/domains/ui/store/celebration-store';
import styles from '../Home.module.scss';

export default function BoardPage() {
  const showNewBadge = useCelebrationStore((s) => s.showNewBadge);

  return (
    <div className={styles.app} style={{ paddingTop: '80px' }}>
      <FeedSection showNewBadge={showNewBadge} />
    </div>
  );
}
