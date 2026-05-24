'use client';

import { useState, useRef } from 'react';
import styles from './ComposeSection.module.scss';
import EmojiPicker from './EmojiPicker';
import CharCounter from './CharCounter';
import { useCreateMessageMutation } from '@/domains/messages/mutation/mutations';
import { useToast } from '@/hooks/useToast';

const COUNTRY_OPTIONS = [
  { code: '', label: '🌍 Everywhere' },
  { code: 'SA', label: '🇸🇦 Saudi Arabia' },
  { code: 'EG', label: '🇪🇬 Egypt' },
  { code: 'ID', label: '🇮🇩 Indonesia' },
  { code: 'PK', label: '🇵🇰 Pakistan' },
  { code: 'BD', label: '🇧🇩 Bangladesh' },
  { code: 'TR', label: '🇹🇷 Turkey' },
  { code: 'NG', label: '🇳🇬 Nigeria' },
  { code: 'MY', label: '🇲🇾 Malaysia' },
  { code: 'DZ', label: '🇩🇿 Algeria' },
  { code: 'MA', label: '🇲🇦 Morocco' },
  { code: 'IR', label: '🇮🇷 Iran' },
  { code: 'JO', label: '🇯🇴 Jordan' },
  { code: 'GB', label: '🇬🇧 United Kingdom' },
  { code: 'US', label: '🇺🇸 United States' },
  { code: 'FR', label: '🇫🇷 France' },
  { code: 'DE', label: '🇩🇪 Germany' },
  { code: 'SN', label: '🇸🇳 Senegal' },
];

interface ComposeCardProps {
  onSend: (text: string, location: string) => void;
}

export default function ComposeCard({ onSend }: ComposeCardProps) {
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const createMessage = useCreateMessageMutation();
  const { show } = useToast();

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

  async function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;

    try {
      await createMessage.mutateAsync({
        messageText: trimmed,
        countryCode: location || 'XX',
        displayName: undefined,
      });
      setText('');
      onSend(trimmed, location);
    } catch {
      show('⚠️', 'Could not send your wish. Please try again.');
    }
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
            disabled={!text.trim() || createMessage.isPending}
            aria-label="Send your Eid wish"
            className={styles.sendBtn}
          >
            {createMessage.isPending ? 'Sending…' : 'Send Wish →'}
          </button>
        </div>
      </div>
    </div>
  );
}
