'use client';

import { useState } from 'react';
import styles from './FeedSection.module.scss';

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
      className={`${styles.rxn} ${active ? styles.rxnLit : ''}`}
    >
      {emoji}
      <span className={styles.rxnCount}>{count}</span>
    </button>
  );
}
