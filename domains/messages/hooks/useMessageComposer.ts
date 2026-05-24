'use client';

import { useState, useRef } from 'react';
import { useCreateMessageMutation } from '@/domains/messages/mutation/mutations';
import { useToast } from '@/hooks/useToast';

export function useMessageComposer(onSend: (text: string, location: string) => void) {
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [userId] = useState<string | undefined>(() => {
    if (typeof window === 'undefined') return undefined;
    const stored = localStorage.getItem('eid-identity');
    if (stored) return stored;
    const id = crypto.randomUUID();
    localStorage.setItem('eid-identity', id);
    return id;
  });
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
        userId,
      });
      setText('');
      onSend(trimmed, location);
    } catch {
      show('⚠️', 'Could not send your wish. Please try again.');
    }
  }

  return {
    text,
    setText,
    location,
    setLocation,
    insertEmoji,
    handleSend,
    isPending: createMessage.isPending,
    textareaRef,
  };
}
