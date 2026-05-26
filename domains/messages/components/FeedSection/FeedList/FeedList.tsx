'use client';

import { memo, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FeedMessage } from '@/lib/types';
import MessageCard from '../MessageCard';
import styles from '../FeedSection.module.scss';
import type { FloatingAnimationMap } from '@/hooks/useFloatingAnimations';
import {
  BASE_VISIBLE,
  FEED_ITEM_INITIAL,
  FLOAT_HOVER,
  REDUCED_MOTION_INITIAL,
  REDUCED_MOTION_VISIBLE,
} from '@/constants/motion';

interface FeedListProps {
  messages: FeedMessage[];
  animations: FloatingAnimationMap;
  reducedMotion: boolean;
}

const FeedList = memo(function FeedList({
  messages,
  animations,
  reducedMotion,
}: FeedListProps) {
  const initial = reducedMotion ? REDUCED_MOTION_INITIAL : FEED_ITEM_INITIAL;

  const rendered = useMemo(
    () =>
      messages.map((message) => {
        const animation = animations[message.id];
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
            key={message.id}
            className={styles.motionItem}
            initial={initial}
            animate={animate}
            transition={animation.transition}
            whileHover={reducedMotion ? undefined : FLOAT_HOVER}
          >
            <MessageCard message={message} />
          </motion.div>
        );
      }),
    [animations, initial, messages, reducedMotion],
  );

  return <AnimatePresence mode="popLayout">{rendered}</AnimatePresence>;
});

FeedList.displayName = 'FeedList';

export default FeedList;
