import { useTranslations } from 'next-intl';
import type { FeedSortMode } from '@/lib/types';
import styles from './FeedSection.module.scss';

interface FeedToolbarProps {
  currentFilter: FeedSortMode;
  onFilterChange: (filter: FeedSortMode) => void;
  showNewBadge: boolean;
}

export default function FeedToolbar({
  currentFilter,
  onFilterChange,
  showNewBadge,
}: FeedToolbarProps) {
  const t = useTranslations('feed');
  const filters: { key: FeedSortMode; label: string }[] = [
    { key: 'newest', label: t('filters.newest') },
    { key: 'popular', label: t('filters.popular') },
    { key: 'trending', label: t('filters.trending') },
  ];

  return (
    <div className={styles.toolbar}>
      <div className={styles.titleRow}>
        <h2 id="feed-heading" className={styles.heading}>
          {t('heading')}
        </h2>
        {showNewBadge && (
          <span className={styles.newBadge} aria-live="polite">
            {t('new')}
          </span>
        )}
      </div>

      <div className={styles.filters} role="group" aria-label={t('filtersAria')}>
        {filters.map(f => (
          <button
            key={f.key}
            type="button"
            onClick={() => onFilterChange(f.key)}
            aria-pressed={currentFilter === f.key}
            className={`${styles.filterBtn} ${currentFilter === f.key ? styles.active : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
