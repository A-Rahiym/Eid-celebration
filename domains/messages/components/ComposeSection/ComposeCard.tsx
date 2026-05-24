'use client';

import type { RefObject } from 'react';
import styles from './ComposeSection.module.scss';
import EmojiPicker from './EmojiPicker';
import CharCounter from './CharCounter';
import { COUNTRY_OPTIONS } from '@/domains/messages/constants/countries';

interface ComposeCardProps {
  text: string;
  onTextChange: (text: string) => void;
  location: string;
  onLocationChange: (location: string) => void;
  insertEmoji: (emoji: string) => void;
  handleSend: () => void;
  isPending: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export default function ComposeCard({
  text,
  onTextChange,
  location,
  onLocationChange,
  insertEmoji,
  handleSend,
  isPending,
  textareaRef,
}: ComposeCardProps) {
  return (
    <div className={styles.card} role="form" aria-label="Share Eid wish">
      <div className={styles.cardGlow} />

      <div className={styles.header}>
        <div className={styles.avatar} aria-hidden="true">You</div>
        <div className={styles.nameRow}>
          <div className={styles.name}>Your Eid Wish</div>
          <select
            value={location}
            onChange={e => onLocationChange(e.target.value)}
            aria-label="Select your country"
            className={styles.locationSelect}
          >
            {COUNTRY_OPTIONS.map(opt => (
              <option key={opt.code || 'global'} value={opt.code} style={{ background: 'var(--navy-surface)', color: 'var(--ivory)' }}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.body}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => onTextChange(e.target.value.slice(0, 280))}
          rows={3}
          maxLength={280}
          placeholder="Share your Eid blessing with the world tonight…"
          aria-label="Write your Eid wish"
          className={styles.textarea}
        />
      </div>

      <div className={styles.footer}>
        <EmojiPicker onEmojiSelect={insertEmoji} />
        <div className={styles.right}>
          <CharCounter current={text.length} />
          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim() || isPending}
            aria-label="Send your Eid wish"
            className={styles.sendBtn}
          >
            {isPending ? 'Sending…' : 'Send Wish →'}
          </button>
        </div>
      </div>
    </div>
  );
}
