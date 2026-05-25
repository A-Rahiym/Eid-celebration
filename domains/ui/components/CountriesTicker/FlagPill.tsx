import { getCountryName, getFlagEmoji } from '@/lib/utils';
import styles from './CountriesTicker.module.scss';

interface FlagPillProps {
  countryCode: string;
  locale: string;
}

export default function FlagPill({ countryCode, locale }: FlagPillProps) {
  return (
    <div className={styles.pill}>
      <span>{getFlagEmoji(countryCode)}</span>
      <span>{getCountryName(countryCode, locale)}</span>
    </div>
  );
}
