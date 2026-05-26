'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { COUNTRY_CODES, GLOBAL_COUNTRY_CODE } from '@/domains/messages/constants/countries';
import { getCountryName, getFlagEmoji } from '@/lib/utils';
import styles from './ComposeSection.module.scss';

interface CountrySelectorProps {
  location: string;
  onLocationChange: (code: string) => void;
}

export default function CountrySelector({ location, onLocationChange }: CountrySelectorProps) {
  const t = useTranslations('compose');
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const normalizedSearch = search.trim().toLowerCase();

  const options = useMemo(() => {
    const all = COUNTRY_CODES.map((code) => ({
      code,
      name: getCountryName(code, locale),
      label: `${getFlagEmoji(code)} ${getCountryName(code, locale)}`,
    })).sort((a, b) => a.name.localeCompare(b.name, locale));

    if (!normalizedSearch) return all;
    return all.filter(
      (opt) =>
        opt.name.toLowerCase().includes(normalizedSearch) ||
        opt.code.toLowerCase().includes(normalizedSearch),
    );
  }, [locale, normalizedSearch]);

  const currentLabel = location
    ? `${getFlagEmoji(location)} ${getCountryName(location, locale)}`
    : `${getFlagEmoji(GLOBAL_COUNTRY_CODE)} ${t('everywhere')}`;

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      setOpen(false);
      setSearch('');
    }
  }

  return (
    <div className={styles.locationGroup} ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className={styles.locationTrigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          const next = !open;
          if (!next) setSearch('');
          setOpen(next);
        }}
      >
        <span>{currentLabel}</span>
        <svg className={styles.chevron} width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className={styles.dropdownMenu} role="listbox" aria-label={t('selectCountry')}>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchCountry')}
            aria-label={t('searchCountry')}
            className={styles.searchInput}
          />
          <div className={styles.optionsList}>
            {options.map((opt) => (
              <button
                key={opt.code}
                type="button"
                role="option"
                aria-selected={opt.code === location}
                className={`${styles.optionButton} ${opt.code === location ? styles.optionActive : ''}`}
                onClick={() => {
                  onLocationChange(opt.code);
                  setSearch('');
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
