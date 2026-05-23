import styles from './ComposeSection.module.scss';

interface CharCounterProps {
  current: number;
  max?: number;
}

export default function CharCounter({ current, max = 280 }: CharCounterProps) {
  return (
    <span className={styles.charCount} aria-live="polite">
      {current} / {max}
    </span>
  );
}
