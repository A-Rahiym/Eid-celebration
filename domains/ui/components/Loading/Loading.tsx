'use client';

import styles from './Loading.module.scss';

interface LoadingProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullHeight?: boolean;
  className?: string;
}

export default function Loading({
  label = 'Loading…',
  size = 'md',
  fullHeight = false,
  className,
}: LoadingProps) {
  const wrapperClasses = [styles.wrapper, fullHeight && styles.fullHeight, className]
    .filter(Boolean)
    .join(' ');
  const spinnerClasses = [styles.spinner, styles[size]].join(' ');

  return (
    <div className={wrapperClasses} role="status" aria-live="polite">
      <div className={spinnerClasses} aria-hidden="true" />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
