'use client';

import { useContext } from 'react';
import { ToastContext } from '@/components/ui/Toast/ToastProvider';

export function useToast() {
  return useContext(ToastContext);
}
