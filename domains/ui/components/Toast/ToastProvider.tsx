'use client';

import { createContext, useState, useCallback, type ReactNode } from 'react';
import Toast from './Toast';

interface ToastContextValue {
  show: (icon: string, message: string) => void;
}

export const ToastContext = createContext<ToastContextValue>({
  show: () => {},
});

interface ToastState {
  icon: string;
  message: string;
  visible: boolean;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    icon: '🌙',
    message: '',
    visible: false,
  });

  const show = useCallback((icon: string, message: string) => {
    setToast({ icon, message, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3800);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <Toast icon={toast.icon} message={toast.message} visible={toast.visible} />
    </ToastContext.Provider>
  );
}
