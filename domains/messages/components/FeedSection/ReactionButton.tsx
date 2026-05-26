'use client';

import { useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { useAddReactionMutation } from '@/domains/reactions/mutation/add-reaction';
import { useRemoveReactionMutation } from '@/domains/reactions/mutation/remove-reaction';
import styles from './FeedSection.module.scss';

interface ReactionButtonProps {
  emoji: string;
  initialCount: number;
  messageId: string;
  initialActive?: boolean;
}

export default function ReactionButton({ emoji, initialCount, messageId, initialActive = false }: ReactionButtonProps) {
  const [active, setActive] = useState(initialActive);
  const [count, setCount] = useState(initialCount);
  const addReaction = useAddReactionMutation();
  const removeReaction = useRemoveReactionMutation();
  const isPending = addReaction.isPending || removeReaction.isPending;
  const t = useTranslations('feed');
  const formatter = useFormatter();

  async function toggle() {
    if (isPending) return;

    const prevActive = active;
    const prevCount = count;

    setActive(!active);
    setCount(c => active ? c - 1 : c + 1);

    try {
      if (active) {
        await removeReaction.mutateAsync({ messageId, reactionType: emoji });
      } else {
        await addReaction.mutateAsync({ messageId, reactionType: emoji });
      }
    } catch {
      setActive(prevActive);
      setCount(prevCount);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      aria-label={t('reactionAria', { emoji, count: formatter.number(count) })}
      aria-pressed={active}
      className={`${styles.rxn} ${active ? styles.rxnLit : ''}`}
    >
      {emoji}
      <span className={styles.rxnCount}>{formatter.number(count)}</span>
    </button>
  );
}
