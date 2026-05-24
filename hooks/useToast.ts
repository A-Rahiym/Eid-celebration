'use client';
import { useContext } from 'react';
import { ToastContext } from '@/domains/ui/components/Toast/ToastProvider';

export function useToast() {
  return useContext(ToastContext);
}
