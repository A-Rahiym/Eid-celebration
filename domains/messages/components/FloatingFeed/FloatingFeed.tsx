'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useMessagesQuery } from '@/domains/messages/query/queries';
import MessageCard from '@/domains/messages/components/FeedSection/MessageCard';
import { useFloatingAnimations } from '@/hooks/useFloatingAnimations';
import {
  BASE_VISIBLE,
  FLOATING_FEED_ANIMATION_CONFIG,
  FLOATING_FEED_INITIAL,
  FLOAT_HOVER,
  REDUCED_MOTION_INITIAL,
  REDUCED_MOTION_VISIBLE,
} from '@/constants/motion';
import styles from './FloatingFeed.module.scss';

export default function FloatingFeed() {
  const t = useTranslations('feed');
  const { data, isLoading } = useMessagesQuery({ sortBy: 'newest', page: 1 });
  const messages = data?.items;
  const recent = useMemo(() => (messages ?? []).slice(0, 2), [messages]);
  const { animations, reducedMotion } = useFloatingAnimations(
    recent,
    FLOATING_FEED_ANIMATION_CONFIG,
  );

  if (isLoading || recent.length === 0) return null;

  const initial = reducedMotion ? REDUCED_MOTION_INITIAL : FLOATING_FEED_INITIAL;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{t('floatingRecentlyAdded')}</h2>
      <div className={styles.stage}>
        {recent.map((msg) => {
          const animation = animations[msg.id];
          if (!animation) return null;

          const animate = reducedMotion
            ? REDUCED_MOTION_VISIBLE
            : {
                ...BASE_VISIBLE,
                x: animation.x,
                y: animation.y,
                rotate: animation.rotate,
              };

          return (
            <motion.div
              key={msg.id}
              className={styles.floatWrap}
              initial={initial}
              animate={animate}
              transition={animation.transition}
              whileHover={reducedMotion ? undefined : FLOAT_HOVER}
            >
              <MessageCard message={msg} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
