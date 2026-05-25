import type { Country } from '@/lib/types';
import { getCountryName } from '@/lib/utils';
import styles from './CountriesTicker.module.scss';

interface FlagPillProps {
  country: Country;
  locale: string;
}

export default function FlagPill({ country, locale }: FlagPillProps) {
  return (
    <div className={styles.pill}>
      <span>{country.flag}</span>
      <span>{getCountryName(country.code, locale)}</span>
    </div>
  );
}
