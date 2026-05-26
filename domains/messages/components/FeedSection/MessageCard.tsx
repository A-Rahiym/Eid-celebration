'use client';

import { memo, type CSSProperties } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { FeedMessage } from '@/lib/types';
import { getFlagEmoji, getCountryName, formatRelativeTime } from '@/lib/utils';
import styles from './FeedSection.module.scss';
import CardAvatar from './CardAvatar';
import ReactionButton from './ReactionButton';
import CornerRosette from '@/domains/ui/components/icons/CornerRosette';

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

interface MessageCardProps {
  message: FeedMessage;
  isNew?: boolean;
  style?: CSSProperties;
}

const MessageCard = memo(function MessageCard({ message: msg, isNew, style }: MessageCardProps) {
  const t = useTranslations('feed');
  const locale = useLocale();
  const flagEmoji = getFlagEmoji(msg.country_code);
  const country = msg.country_code === 'XX'
    ? t('everywhere')
    : getCountryName(msg.country_code, locale);
  const color = colorFromSeed(msg.user_id, AVATAR_COLORS);
  const accent = colorFromSeed(msg.user_id, ACCENT_COLORS);
  const avatarSeed = msg.avatar_seed;
  const time = formatRelativeTime(msg.created_at, locale);

  return (
    <article
      className={styles.card}
      style={{
        ['--card-accent' as string]: accent,
        animation: isNew
          ? 'newCardPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both'
          : undefined,
        ...style,
      }}
    >
      <CornerRosette className={styles.cardCornerTL} />
      <CornerRosette className={styles.cardCornerTR} />
      <CornerRosette className={styles.cardCornerBL} />
      <CornerRosette className={styles.cardCornerBR} />

      <div className={styles.bottomLine} aria-hidden="true" />
      <div className={styles.sideL} aria-hidden="true" />
      <div className={styles.sideR} aria-hidden="true" />
      <div className={styles.diamond} aria-hidden="true" />

      <div className={styles.cardHead}>
        <CardAvatar name={msg.display_name} avatarSeed={avatarSeed} color={color} accent={accent} />
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
        <div className={styles.reactions} role="group" aria-label={t('reactionsAria')}>
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
          aria-label={t('moreOptions')}
          className={styles.cardMore}
        >
          ···
        </span>
      </div>
    </article>
  );
});

MessageCard.displayName = 'MessageCard';

export default MessageCard;
