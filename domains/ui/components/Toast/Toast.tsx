'use client';

import { useCallback } from 'react';
import styles from './Toast.module.scss';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastProps {
  icon: string;
  message: string;
  visible: boolean;
  action: ToastAction | null;
  onAction: () => void;
}

export default function Toast({ icon, message, visible, action, onAction }: ToastProps) {
  const handleAction = useCallback(() => {
    action?.onClick();
    onAction();
  }, [action, onAction]);

  return (
    <div
      className={`${styles.toast} ${visible ? styles.show : ''}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.icon}>{icon}</span>
      <span>{message}</span>
      {action && (
        <button type="button" className={styles.action} onClick={handleAction}>
          {action.label}
        </button>
      )}
    </div>
  );
}
