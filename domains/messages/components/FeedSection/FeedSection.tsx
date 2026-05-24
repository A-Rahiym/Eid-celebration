'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styles from './FeedSection.module.scss';
import Container from '@/domains/ui/components/Container/Container';
import FeedToolbar from './FeedToolbar';
import FeedGrid from './FeedGrid';
import MessageCard from './MessageCard';
import { useMessagesQuery } from '@/domains/messages/query/queries';
import { useFeedFilterStore } from '@/domains/ui/store/feed-filter-store';

interface FeedSectionProps {
  showNewBadge: boolean;
}

export default function FeedSection({ showNewBadge }: FeedSectionProps) {
  const sortMode = useFeedFilterStore((s) => s.sortMode);
  const countryCode = useFeedFilterStore((s) => s.countryCode);
  const setSortMode = useFeedFilterStore((s) => s.setSortMode);

  const { data, isLoading } = useMessagesQuery({
    sortBy: sortMode,
    countryCode,
  });

  const messages = data?.items ?? [];

  return (
    <section className={styles.section} id="feed" aria-labelledby="feed-heading">
      <Container>
        <FeedToolbar
          currentFilter={sortMode}
          onFilterChange={(f) => setSortMode(f)}
          showNewBadge={showNewBadge}
        />
        <FeedGrid>
          <AnimatePresence mode="popLayout">
            {isLoading && messages.length === 0 ? (
              <motion.p
                key="loading"
                className={styles.loading}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Loading wishes from around the world…
              </motion.p>
            ) : (
              messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.04,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <MessageCard message={msg} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </FeedGrid>
      </Container>
    </section>
  );
}
