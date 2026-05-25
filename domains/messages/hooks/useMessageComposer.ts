'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useCreateMessageMutation } from '@/domains/messages/mutation/mutations';
import { pickAvatar } from '@/lib/avatar';
import { useToast } from '@/hooks/useToast';

const ALL_AVATARS = ['m1','m2','m3','m4','m5','f1','f2','f3','f4','f5'];

function loadUserId(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const stored = localStorage.getItem('eid-identity');
  if (stored) return stored;
  const id = crypto.randomUUID();
  localStorage.setItem('eid-identity', id);
  return id;
}

function loadGender(): 'm' | 'f' | undefined {
  if (typeof window === 'undefined') return undefined;
  const stored = localStorage.getItem('eid-gender');
  if (stored === 'm' || stored === 'f') return stored;
  return undefined;
}

function loadAvatarOverride(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const stored = localStorage.getItem('eid-avatar');
  if (stored && ALL_AVATARS.includes(stored)) return stored;
  return undefined;
}

export function useMessageComposer(onSend: (text: string, location: string) => void) {
  const t = useTranslations('toast');
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGenderState] = useState<'m' | 'f' | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [avatarOverride, setAvatarOverride] = useState<string | undefined>(undefined);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const createMessage = useCreateMessageMutation();
  const { show } = useToast();

  useEffect(() => {
    setTimeout(() => {
      setUserId(loadUserId());
      setGenderState(loadGender());
      setAvatarOverride(loadAvatarOverride());
    }, 0);
  }, []);

  const setGender = useCallback((value: 'm' | 'f' | undefined) => {
    setGenderState(value);
    if (typeof window !== 'undefined') {
      if (value) {
        localStorage.setItem('eid-gender', value);
      } else {
        localStorage.removeItem('eid-gender');
      }
    }
  }, []);

  const cycleAvatar = useCallback(() => {
    const pool = gender ? ALL_AVATARS.filter(a => a.startsWith(gender)) : ALL_AVATARS;
    const current = avatarOverride || (userId ? pickAvatar(userId, gender) : '');
    const others = pool.filter(a => a !== current);
    if (others.length === 0) return;
    const next = others[Math.floor(Math.random() * others.length)];
    setAvatarOverride(next);
    localStorage.setItem('eid-avatar', next);
  }, [gender, avatarOverride, userId]);

  const avatarSeed = avatarOverride || (userId ? pickAvatar(userId, gender) : '');

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
        avatarSeed,
      });
      setText('');
      onSend(trimmed, location);
    } catch {
      show('⚠️', t('sendError'));
    }
  }

  return {
    text,
    setText,
    location,
    setLocation,
    gender,
    setGender,
    insertEmoji,
    handleSend,
    isPending: createMessage.isPending,
    textareaRef,
    avatarSeed,
    cycleAvatar,
  };
}
