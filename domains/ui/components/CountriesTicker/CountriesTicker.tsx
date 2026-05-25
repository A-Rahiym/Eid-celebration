'use client';

import { useLocale, useTranslations } from 'next-intl';
import { COUNTRIES } from '@/lib/constants';
import styles from './CountriesTicker.module.scss';
import FlagPill from './FlagPill';

export default function CountriesTicker() {
  const doubled = [...COUNTRIES, ...COUNTRIES];
  const t = useTranslations('countries');
  const locale = useLocale();

  return (
    <section className={styles.section} aria-label={t('aria')}>
      <p className={styles.label}>
        {t('label', { count: COUNTRIES.length })}
      </p>
      <div className={styles.tickerWrap} aria-hidden="true">
        <div className={styles.ticker}>
          {doubled.map((country, i) => (
            <FlagPill key={`${country.flag}-${i}`} country={country} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
