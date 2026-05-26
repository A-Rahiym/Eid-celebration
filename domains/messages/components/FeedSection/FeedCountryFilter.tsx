'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { WORLD_COUNTRY_CODES } from '@/lib/countries';
import { getFlagEmoji, getCountryName } from '@/lib/utils';
import { useFeedFilterStore } from '@/domains/ui/store/feed-filter-store';
import styles from './FeedSection.module.scss';

export default function FeedCountryFilter() {
  const t = useTranslations('feed');
  const locale = useLocale();
  const countryCode = useFeedFilterStore((s) => s.countryCode);
  const setCountryCode = useFeedFilterStore((s) => s.setCountryCode);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const filtered = useMemo(() => {
    if (!search) return WORLD_COUNTRY_CODES;
    const q = search.toLowerCase();
    return WORLD_COUNTRY_CODES.filter((code) => {
      const name = getCountryName(code, locale).toLowerCase();
      return name.includes(q) || code.toLowerCase().includes(q);
    });
  }, [search, locale]);

  const currentName = countryCode
    ? `${getFlagEmoji(countryCode)} ${getCountryName(countryCode, locale)}`
    : t('allCountries');

  return (
    <div className={styles.countryFilter} ref={containerRef}>
      <button
        type="button"
        className={styles.countryTrigger}
        onClick={() => setOpen((p) => !p)}
        aria-label={t('filterByCountry')}
        aria-expanded={open}
      >
        <span className={styles.countryLabel}>{currentName}</span>
      </button>

      {open && (
        <div className={styles.countryMenu} role="menu">
          <input
            ref={inputRef}
            type="text"
            className={styles.countrySearch}
            placeholder={t('filterByCountry')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={t('filterByCountry')}
          />

          <div className={styles.countryList}>
            {!search && (
              <button
                type="button"
                role="menuitem"
                className={`${styles.countryOption} ${!countryCode ? styles.active : ''}`}
                onClick={() => { setCountryCode(null); setOpen(false); setSearch(''); }}
              >
                {t('allCountries')}
              </button>
            )}

            {filtered.map((code) => (
              <button
                key={code}
                type="button"
                role="menuitem"
                className={`${styles.countryOption} ${countryCode === code ? styles.active : ''}`}
                onClick={() => { setCountryCode(code); setOpen(false); setSearch(''); }}
              >
                <span className={styles.countryFlag}>{getFlagEmoji(code)}</span>
                {getCountryName(code, locale)}
              </button>
            ))}

            {filtered.length === 0 && (
              <span className={styles.countryEmpty}>No countries found</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
