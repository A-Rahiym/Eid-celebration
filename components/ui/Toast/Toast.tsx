'use client';

import styles from './Toast.module.scss';

interface ToastProps {
  icon: string;
  message: string;
  visible: boolean;
}

export default function Toast({ icon, message, visible }: ToastProps) {
  return (
    <div
      className={`${styles.toast} ${visible ? styles.show : ''}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.icon}>{icon}</span>
      <span>{message}</span>
    </div>
  );
}
