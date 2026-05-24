'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Message } from '@/lib/types';

interface CreateMessageInput {
  displayName?: string;
  countryCode: string;
  messageText: string;
  userId?: string;
}

export function useCreateMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateMessageInput) => {
      const res = await fetch('/api/messages/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageText: input.messageText,
          countryCode: input.countryCode,
          displayName: input.displayName,
          userId: input.userId || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || 'Failed to create message');
      }

      const json = await res.json();
      return json.data as Message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}
