'use client';

import { createContext, useState, useCallback, useRef, type ReactNode } from 'react';
import Toast from './Toast';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastContextValue {
  show: (icon: string, message: string, action?: ToastAction) => void;
}

export const ToastContext = createContext<ToastContextValue>({
  show: () => {},
});

interface ToastState {
  icon: string;
  message: string;
  visible: boolean;
  action: ToastAction | null;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    icon: '🌙',
    message: '',
    visible: false,
    action: null,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false, action: null }));
  }, []);

  const show = useCallback((icon: string, message: string, action?: ToastAction) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ icon, message, visible: true, action: action ?? null });
    timerRef.current = setTimeout(hide, 3800);
  }, [hide]);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <Toast icon={toast.icon} message={toast.message} visible={toast.visible} action={toast.action} onAction={hide} />
    </ToastContext.Provider>
  );
}
