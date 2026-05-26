'use client';

import { useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import styles from './FeedSection.module.scss';

interface ReactionButtonProps {
  emoji: string;
  initialCount: number;
  messageId: string;
  userId: string;
}

export default function ReactionButton({ emoji, initialCount, messageId, userId }: ReactionButtonProps) {
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);
  const t = useTranslations('feed');
  const formatter = useFormatter();

  async function toggle() {
    if (busy) return;
    setBusy(true);

    const prevActive = active;
    const prevCount = count;

    setActive(!active);
    setCount(c => active ? c - 1 : c + 1);

    try {
      const method = active ? 'DELETE' : 'POST';
      const endpoint = active ? '/api/reactions/remove' : '/api/reactions/add';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, reactionType: emoji, userId }),
      });

      if (!res.ok) throw new Error('Failed');

      const json = await res.json();
      const updated = json.data as { reaction_type: string; count: number }[];
      const match = updated.find((r) => r.reaction_type === emoji);
      setCount(match?.count ?? 0);
    } catch {
      setActive(prevActive);
      setCount(prevCount);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-label={t('reactionAria', { emoji, count: formatter.number(count) })}
      aria-pressed={active}
      className={`${styles.rxn} ${active ? styles.rxnLit : ''}`}
    >
      {emoji}
      <span className={styles.rxnCount}>{formatter.number(count)}</span>
    </button>
  );
}
