'use client';

import { useState, useRef } from 'react';
import styles from './ComposeSection.module.scss';
import EmojiPicker from './EmojiPicker';
import CharCounter from './CharCounter';

interface ComposeCardProps {
  onSend: (text: string, location: string) => void;
}

const LOCATION_OPTIONS = [
  '🌍 Everywhere', '🇸🇦 Saudi Arabia', '🇪🇬 Egypt', '🇮🇩 Indonesia',
  '🇵🇰 Pakistan', '🇧🇩 Bangladesh', '🇹🇷 Turkey', '🇳🇬 Nigeria',
  '🇲🇾 Malaysia', '🇩🇿 Algeria', '🇲🇦 Morocco', '🇮🇷 Iran',
  '🇯🇴 Jordan', '🇬🇧 United Kingdom', '🇺🇸 United States',
  '🇫🇷 France', '🇩🇪 Germany', '🇸🇳 Senegal',
];

export default function ComposeCard({ onSend }: ComposeCardProps) {
  const [text, setText] = useState('');
  const [location, setLocation] = useState('🌍 Everywhere');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function insertEmoji(emoji: string) {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const val = ta.value;
    const newVal = val.slice(0, start) + emoji + val.slice(ta.selectionEnd);
    setText(newVal);
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = start + emoji.length;
      ta.focus();
    });
  }

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed, location);
    setText('');
  }

  return (
    <div className={styles.card} role="form" aria-label="Share Eid wish">
      <div className={styles.cardGlow} />

      <div className={styles.header}>
        <div className={styles.avatar} aria-hidden="true">You</div>
        <div className={styles.nameRow}>
          <div className={styles.name}>Your Eid Wish</div>
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            aria-label="Select your country"
            className={styles.locationSelect}
          >
            {LOCATION_OPTIONS.map(opt => (
              <option key={opt} value={opt} style={{ background: 'var(--navy-surface)', color: 'var(--ivory)' }}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.body}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value.slice(0, 280))}
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
            disabled={!text.trim()}
            aria-label="Send your Eid wish"
            className={styles.sendBtn}
          >
            Send Wish →
          </button>
        </div>
      </div>
    </div>
  );
}
