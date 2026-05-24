'use client';

import type { FeedMessage } from '@/lib/types';
import { getFlagEmoji, getCountryName } from '@/lib/utils';
import styles from './FeedSection.module.scss';
import CardAvatar from './CardAvatar';
import ReactionButton from './ReactionButton';

const AVATAR_COLORS = [
  '#1c4a3a', '#2a1a4a', '#1a3a2a', '#3a2a0a',
  '#1a2a4a', '#0a3a1a', '#2a1a2a', '#3a1a0a',
  '#1a2a40', '#2a3a1a', '#1a1a3a', '#0a1a3a',
];

const ACCENT_COLORS = [
  '#3db89c', '#9070cc', '#5db87a', '#c9a040',
  '#4a80c0', '#3db89c', '#b070a0', '#c9a96e',
  '#5090d0', '#70b840', '#7060c0', '#4070b0',
];

function colorFromSeed(seed: string, palette: string[]) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
}

function formatTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

interface MessageCardProps {
  message: FeedMessage;
  isNew?: boolean;
  style?: React.CSSProperties;
}

export default function MessageCard({ message: msg, isNew, style }: MessageCardProps) {
  const flagEmoji = getFlagEmoji(msg.country_code);
  const country = getCountryName(msg.country_code);
  const color = colorFromSeed(msg.user_id, AVATAR_COLORS);
  const accent = colorFromSeed(msg.user_id, ACCENT_COLORS);
  const time = formatTime(msg.created_at);

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
        style={{ background: accent }}
      />

      <div className={styles.cardHead}>
        <CardAvatar name={msg.display_name} color={color} accent={accent} />
        <div className={styles.cardInfo}>
          <div className={styles.cardName}>
            {msg.display_name}
            <span className={styles.flag}>{flagEmoji}</span>
          </div>
          <div className={styles.cardCountry}>
            <span>{country}</span>
            <span className={styles.dot} />
            <span className={styles.cardTime}>{time}</span>
          </div>
        </div>
      </div>

      <div className={styles.cardBody}>{msg.message_text}</div>

      <div className={styles.cardFoot}>
        <div className={styles.reactions} role="group" aria-label="Reactions">
          {msg.reactions.map((r) => (
            <ReactionButton
              key={r.reaction_type}
              emoji={r.reaction_type}
              initialCount={r.count}
            />
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
