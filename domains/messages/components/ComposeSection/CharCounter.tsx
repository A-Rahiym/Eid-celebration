import { useFormatter } from 'next-intl';
import styles from './ComposeSection.module.scss';

interface CharCounterProps {
  current: number;
  max?: number;
}

export default function CharCounter({ current, max = 280 }: CharCounterProps) {
  const formatter = useFormatter();

  return (
    <span className={styles.charCount} aria-live="polite">
      {formatter.number(current)} / {formatter.number(max)}
    </span>
  );
}
