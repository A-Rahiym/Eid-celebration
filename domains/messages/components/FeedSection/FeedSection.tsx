'use client';

import styles from './FeedSection.module.scss';
import Container from '@/domains/ui/components/Container/Container';
import FeedToolbar from './FeedToolbar';
import FeedGrid from './FeedGrid';
import { useMessagesQuery } from '@/domains/messages/query/queries';
import { useFeedFilterStore } from '@/domains/ui/store/feed-filter-store';
import FeedList from './FeedList/FeedList';
import FeedState, { type FeedStateStatus } from './FeedState/FeedState';
import { useFloatingAnimations } from '@/hooks/useFloatingAnimations';
import { FEED_LIST_ANIMATION_CONFIG } from '@/constants/motion';

interface FeedSectionProps {
  showNewBadge: boolean;
}

export default function FeedSection({ showNewBadge }: FeedSectionProps) {
  const sortMode = useFeedFilterStore((s) => s.sortMode);
  const countryCode = useFeedFilterStore((s) => s.countryCode);
  const page = useFeedFilterStore((s) => s.page);
  const setSortMode = useFeedFilterStore((s) => s.setSortMode);
  const nextPage = useFeedFilterStore((s) => s.nextPage);
  const prevPage = useFeedFilterStore((s) => s.prevPage);

  const { data, isLoading, isError } = useMessagesQuery({
    sortBy: sortMode,
    countryCode,
    page,
  });

  const messages = data?.items ?? [];
  const status: FeedStateStatus = isLoading && messages.length === 0
    ? 'loading'
    : isError
      ? 'error'
      : messages.length === 0
        ? 'empty'
        : 'populated';
  const { animations, reducedMotion } = useFloatingAnimations(
    messages,
    FEED_LIST_ANIMATION_CONFIG,
  );

  return (
    <section className={styles.section} id="feed" aria-labelledby="feed-heading">
      <Container>
        <FeedToolbar
          currentFilter={sortMode}
          onFilterChange={(f) => setSortMode(f)}
          showNewBadge={showNewBadge}
        />
        <FeedGrid isBusy={status === 'loading'}>
          <FeedState status={status} />
          {status === 'populated' && (
            <>
              <FeedList
                messages={messages}
                animations={animations}
                reducedMotion={reducedMotion}
              />
              <div className={styles.pagination}>
                <button
                  type="button"
                  className={styles.pageBtn}
                  disabled={page <= 1}
                  onClick={prevPage}
                >
                  ← Prev
                </button>
                <span className={styles.pageInfo}>
                  Page {data?.page ?? 1}
                </span>
                <button
                  type="button"
                  className={styles.pageBtn}
                  disabled={!data?.hasMore}
                  onClick={nextPage}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </FeedGrid>
      </Container>
    </section>
  );
}
