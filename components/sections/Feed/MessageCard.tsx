'use client';

import type { Wish } from '@/lib/types';
import { getFlagEmoji, getCountryName } from '@/lib/utils';
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
      style={{
        breakInside: 'avoid',
        background: 'var(--glass)',
        border: '1px solid var(--glass-border)',
        borderRadius: 16,
        padding: '1.2rem 1.3rem',
        marginBottom: '1.1rem',
        backdropFilter: 'blur(12px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.2)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        animation: isNew ? 'newCardPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both' : 'cardIn 0.5s ease both',
        display: 'block',
        cursor: 'default',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '15%',
          bottom: '15%',
          width: 2,
          borderRadius: 2,
          background: wish.accent || 'var(--gold)',
          opacity: 0.6,
          transition: 'opacity 0.3s',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', marginBottom: '0.9rem' }}>
        <CardAvatar name={wish.name} color={wish.color} accent={wish.accent} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '0.83rem',
              fontWeight: 500,
              color: 'var(--ivory)',
              lineHeight: 1.2,
              marginBottom: '0.15rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              flexWrap: 'wrap',
            }}
          >
            {wish.name}
            <span style={{ fontSize: '0.85rem', lineHeight: 1 }}>{flagEmoji}</span>
          </div>
          <div
            style={{
              fontSize: '0.68rem',
              color: 'var(--ivory-50)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <span>{country}</span>
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: 'var(--ivory-25)',
              }}
            />
            <span style={{ fontSize: '0.62rem', color: 'var(--ivory-25)' }}>{wish.time}</span>
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: '0.87rem',
          lineHeight: 1.68,
          color: 'rgba(245,240,232,0.78)',
          fontWeight: 300,
          marginBottom: '1rem',
          wordBreak: 'break-word',
        }}
      >
        {wish.text}
        {wish.arabic && (
          <div
            lang="ar"
            style={{
              fontFamily: 'var(--font-noto-arabic), serif',
              fontSize: '1rem',
              color: 'var(--gold)',
              opacity: 0.75,
              direction: 'rtl',
              textAlign: 'right',
              marginTop: '0.3rem',
              lineHeight: 1.5,
            }}
            aria-label={`Arabic text: ${wish.arabic}`}
          >
            {wish.arabic}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }} role="group" aria-label="Reactions">
          {emojiEntries.map(([emoji, count]) => (
            <ReactionButton key={emoji} emoji={emoji} initialCount={count} />
          ))}
        </div>
        <span
          role="button"
          tabIndex={0}
          aria-label="More options"
          style={{
            fontSize: '0.65rem',
            color: 'var(--ivory-25)',
            cursor: 'pointer',
            transition: 'color 0.2s',
            letterSpacing: '0.04em',
          }}
        >
          ···
        </span>
      </div>
    </article>
  );
}
