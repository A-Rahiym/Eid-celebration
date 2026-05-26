'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ReactionCount } from '@/lib/types';
import { getOrCreateUserId } from '@/lib/identity-client';

export function useRemoveReactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      messageId,
      reactionType,
    }: {
      messageId: string;
      reactionType: string;
    }) => {
      const userId = getOrCreateUserId();

      const res = await fetch('/api/reactions/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, reactionType, userId }),
      });
      console.log('Response status:', res);
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
}
