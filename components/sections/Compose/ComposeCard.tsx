'use client';

import { useState, useRef } from 'react';
import EmojiPicker from './EmojiPicker';
import CharCounter from './CharCounter';

interface ComposeCardProps {
  onSend: (text: string, location: string) => void;
}

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

  const locationOptions = [
    '🌍 Everywhere', '🇸🇦 Saudi Arabia', '🇪🇬 Egypt', '🇮🇩 Indonesia',
    '🇵🇰 Pakistan', '🇧🇩 Bangladesh', '🇹🇷 Turkey', '🇳🇬 Nigeria',
    '🇲🇾 Malaysia', '🇩🇿 Algeria', '🇲🇦 Morocco', '🇮🇷 Iran',
    '🇯🇴 Jordan', '🇬🇧 United Kingdom', '🇺🇸 United States',
    '🇫🇷 France', '🇩🇪 Germany', '🇸🇳 Senegal',
  ];

  return (
    <div
      style={{
        background: 'var(--glass)',
        border: '1px solid var(--glass-border)',
        borderRadius: 20,
        padding: '1.5rem 1.8rem',
        backdropFilter: 'blur(20px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      role="form"
      aria-label="Share Eid wish"
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.08) 60%, transparent 95%)',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem' }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--emerald), #0d3028)',
            border: '1px solid rgba(61,184,156,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.65rem',
            fontWeight: 500,
            color: 'var(--teal)',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          You
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--ivory)' }}>
            Your Eid Wish
          </div>
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            aria-label="Select your country"
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '0.7rem',
              color: 'var(--ivory-50)',
              cursor: 'pointer',
              marginTop: 2,
              appearance: 'none',
              WebkitAppearance: 'none',
              paddingRight: 14,
              maxWidth: '100%',
            }}
          >
            {locationOptions.map(opt => (
              <option key={opt} value={opt} style={{ background: 'var(--navy-surface)', color: 'var(--ivory)' }}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ padding: '0.2rem 0 0.8rem', borderBottom: '1px solid var(--glass-border)' }}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value.slice(0, 280))}
          rows={3}
          maxLength={280}
          placeholder="Share your Eid blessing with the world tonight…"
          aria-label="Write your Eid wish"
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '0.95rem',
            fontWeight: 300,
            color: 'var(--ivory)',
            lineHeight: 1.7,
            resize: 'none',
            minHeight: 80,
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '1rem',
          flexWrap: 'wrap',
          gap: '0.8rem',
        }}
      >
        <EmojiPicker onEmojiSelect={insertEmoji} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <CharCounter current={text.length} />
          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim()}
            aria-label="Send your Eid wish"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.08))',
              border: '1px solid rgba(201,169,110,0.3)',
              color: 'var(--gold-pale)',
              padding: '0.5rem 1.3rem',
              borderRadius: 50,
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '0.78rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'all 0.25s',
              opacity: text.trim() ? 1 : 0.4,
              minHeight: 44,
            }}
          >
            Send Wish →
          </button>
        </div>
      </div>
    </div>
  );
}
