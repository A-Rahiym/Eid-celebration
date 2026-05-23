import type { Country } from '@/lib/types';
import styles from './CountriesTicker.module.scss';

interface FlagPillProps {
  country: Country;
}

export default function FlagPill({ country }: FlagPillProps) {
  return (
    <div className={styles.pill}>
      <span>{country.flag}</span>
      <span>{country.name}</span>
    </div>
  );
}
