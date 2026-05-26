'use client';

import { useTranslations } from 'next-intl';
import Loading from '@/domains/ui/components/Loading/Loading';
import styles from '../FeedSection.module.scss';

export type FeedStateStatus = 'loading' | 'empty' | 'error' | 'populated';

interface FeedStateProps {
  status: FeedStateStatus;
}

export default function FeedState({ status }: FeedStateProps) {
  const t = useTranslations('feed');

  if (status === 'populated') return null;

  if (status === 'loading') {
    return (
      <div className={styles.state} role="status" aria-live="polite">
        <Loading size="sm" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={styles.state} role="alert">
        <div className={styles.stateTitle}>{t('errorTitle')}</div>
        <div className={styles.stateBody}>{t('errorBody')}</div>
      </div>
    );
  }

  return (
    <div className={styles.state} role="status" aria-live="polite">
      <div className={styles.stateTitle}>{t('emptyTitle')}</div>
      <div className={styles.stateBody}>{t('emptyBody')}</div>
    </div>
  );
}
