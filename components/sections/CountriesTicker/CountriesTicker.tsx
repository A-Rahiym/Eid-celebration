'use client';

import { COUNTRIES } from '@/lib/constants';
import styles from './CountriesTicker.module.scss';
import FlagPill from './FlagPill';

export default function CountriesTicker() {
  const doubled = [...COUNTRIES, ...COUNTRIES];

  return (
    <section className={styles.section} aria-label="Countries celebrating Eid">
      <p className={styles.label}>
        Celebrating across the world · {COUNTRIES.length} countries
      </p>
      <div className={styles.tickerWrap} aria-hidden="true">
        <div className={styles.ticker}>
          {doubled.map((country, i) => (
            <FlagPill key={`${country.flag}-${i}`} country={country} />
          ))}
        </div>
      </div>
    </section>
  );
}
