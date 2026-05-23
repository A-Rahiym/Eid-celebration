'use client';

import type { Wish } from '@/lib/types';
import { getFlagEmoji, getCountryName } from '@/lib/utils';
import styles from './FeedSection.module.scss';
import CardAvatar from './CardAvatar';
import ReactionButton from './ReactionButton';

interface MessageCardProps {
  wish: Wish;
  isNew?: boolean;
  style?: React.CSSProperties;
}

export default function MessageCard({ wish, isNew, style }: MessageCardProps) {
  const flagEmoji = getFlagEmoji(wish.loc);
  const country = getCountryName(wish.loc);
  const emojiEntries = Object.entries(wish.reactions);

  return (
    <article
      className={styles.card}
      style={{
        animation: isNew
          ? 'newCardPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both'
          : undefined,
        ...style,
      }}
    >
      <div className={styles.cardGlow} />
      <div
        className={styles.accentLine}
        style={{ background: wish.accent || 'var(--gold)' }}
      />

      <div className={styles.cardHead}>
        <CardAvatar name={wish.name} color={wish.color} accent={wish.accent} />
        <div className={styles.cardInfo}>
          <div className={styles.cardName}>
            {wish.name}
            <span className={styles.flag}>{flagEmoji}</span>
          </div>
          <div className={styles.cardCountry}>
            <span>{country}</span>
            <span className={styles.dot} />
            <span className={styles.cardTime}>{wish.time}</span>
          </div>
        </div>
      </div>

      <div className={styles.cardBody}>
        {wish.text}
        {wish.arabic && (
          <div
            lang="ar"
            className={styles.arabic}
            aria-label={`Arabic text: ${wish.arabic}`}
          >
            {wish.arabic}
          </div>
        )}
      </div>

      <div className={styles.cardFoot}>
        <div className={styles.reactions} role="group" aria-label="Reactions">
          {emojiEntries.map(([emoji, count]) => (
            <ReactionButton key={emoji} emoji={emoji} initialCount={count} />
          ))}
        </div>
        <span
          role="button"
          tabIndex={0}
          aria-label="More options"
          className={styles.cardMore}
        >
          ···
        </span>
      </div>
    </article>
  );
}
