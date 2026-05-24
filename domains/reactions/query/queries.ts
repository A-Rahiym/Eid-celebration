'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ReactionCount } from '@/lib/types';

const SESSION_USER_ID = 'anonymous';

export function useReactionMutation() {
  const queryClient = useQueryClient();

  const addReaction = useMutation({
    mutationFn: async ({
      messageId,
      reactionType,
    }: {
      messageId: string;
      reactionType: string;
    }) => {
      const res = await fetch('/api/reactions/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId,
          reactionType,
          userId: SESSION_USER_ID,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || 'Failed to add reaction');
      }

      const json = await res.json();
      return { messageId, reactionType, counts: json.data as ReactionCount[] };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const removeReaction = useMutation({
    mutationFn: async ({
      messageId,
      reactionType,
    }: {
      messageId: string;
      reactionType: string;
    }) => {
      const res = await fetch('/api/reactions/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId,
          reactionType,
          userId: SESSION_USER_ID,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || 'Failed to remove reaction');
      }

      const json = await res.json();
      return { messageId, reactionType, counts: json.data as ReactionCount[] };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  return { addReaction, removeReaction };
}
