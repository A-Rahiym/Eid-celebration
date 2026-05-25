'use client';

import { useLocale, useTranslations } from 'next-intl';
import { WORLD_COUNTRY_CODES } from '@/lib/countries';
import styles from './CountriesTicker.module.scss';
import FlagPill from './FlagPill';

export default function CountriesTicker() {
  const doubled = [...WORLD_COUNTRY_CODES, ...WORLD_COUNTRY_CODES];
  const t = useTranslations('countries');
  const locale = useLocale();

  return (
    <section className={styles.section} aria-label={t('aria')}>
      <p className={styles.label}>
        {t('label', { count: WORLD_COUNTRY_CODES.length })}
      </p>
      <div className={styles.tickerWrap} aria-hidden="true">
        <div className={styles.ticker}>
          {doubled.map((countryCode, i) => (
            <FlagPill key={`${countryCode}-${i}`} countryCode={countryCode} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
