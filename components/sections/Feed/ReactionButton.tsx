'use client';

import { useState } from 'react';

interface ReactionButtonProps {
  emoji: string;
  initialCount: number;
}

export default function ReactionButton({ emoji, initialCount }: ReactionButtonProps) {
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(initialCount);

  function toggle() {
    setActive(prev => {
      setCount(c => prev ? c - 1 : c + 1);
      return !prev;
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`React with ${emoji}, ${count} reactions`}
      aria-pressed={active}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.18rem',
        background: active ? 'var(--gold-glow)' : 'var(--glass)',
        border: `1px solid ${active ? 'rgba(201,169,110,0.3)' : 'var(--glass-border)'}`,
        borderRadius: 20,
        padding: '0.15rem 0.45rem',
        fontSize: '0.78rem',
        cursor: 'pointer',
        transition: 'all 0.18s',
        color: active ? 'var(--gold-pale)' : 'var(--ivory-50)',
        userSelect: 'none',
        fontFamily: 'inherit',
        minHeight: 36,
      }}
    >
      {emoji}
      <span style={{ fontSize: '0.64rem', color: 'var(--ivory-25)', minWidth: 12 }}>
        {count}
      </span>
    </button>
  );
}
