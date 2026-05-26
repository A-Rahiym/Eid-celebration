'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import styles from './ComposeSection.module.scss';
import EmojiPicker from './EmojiPicker';
import CharCounter from './CharCounter';
import CornerRosette from '@/domains/ui/components/icons/CornerRosette';
import { COUNTRY_CODES, GLOBAL_COUNTRY_CODE } from '@/domains/messages/constants/countries';
import { getCountryName, getFlagEmoji } from '@/lib/utils';
import { avatarUrl } from '@/lib/avatar';

interface ComposeCardProps {
  text: string;
  onTextChange: (text: string) => void;
  location: string;
  onLocationChange: (location: string) => void;
  gender: 'm' | 'f' | undefined;
  onGenderChange: (gender: 'm' | 'f' | undefined) => void;
  insertEmoji: (emoji: string) => void;
  handleSend: () => void;
  isPending: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  avatarSeed: string;
  cycleAvatar: () => void;
}

export default function ComposeCard({
  text,
  onTextChange,
  location,
  onLocationChange,
  gender,
  onGenderChange,
  insertEmoji,
  handleSend,
  isPending,
  textareaRef,
  avatarSeed,
  cycleAvatar,
}: ComposeCardProps) {
  const t = useTranslations('compose');
  const locale = useLocale();
  const [countrySearch, setCountrySearch] = useState('');
  const [countryOpen, setCountryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const normalizedSearch = countrySearch.trim().toLowerCase();

  const countryOptions = useMemo(() => {
    const options = COUNTRY_CODES.map((code) => {
      const name = getCountryName(code, locale);
      return {
        code,
        name,
        label: `${getFlagEmoji(code)} ${name}`,
      };
    }).sort((a, b) => a.name.localeCompare(b.name, locale));

    if (!normalizedSearch) return options;
    return options.filter((opt) => (
      opt.name.toLowerCase().includes(normalizedSearch)
      || opt.code.toLowerCase().includes(normalizedSearch)
    ));
  }, [locale, normalizedSearch]);

  const currentCountry = location
    ? {
      code: location,
      name: getCountryName(location, locale),
      label: `${getFlagEmoji(location)} ${getCountryName(location, locale)}`,
    }
    : {
      code: '',
      name: t('everywhere'),
      label: `${getFlagEmoji(GLOBAL_COUNTRY_CODE)} ${t('everywhere')}`,
    };

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setCountryOpen(false);
        setCountrySearch('');
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className={styles.card} role="form" aria-label={t('formLabel')}>
      <div className={styles.cardGlow} />

      <div className={styles.header}>
        <div className={styles.avatarWrap}>
          <div
            className={styles.avatar}
            onClick={cycleAvatar}
            role="button"
            tabIndex={0}
            aria-label={t('changeAvatar')}
          >
            {avatarSeed ? (
              <Image
                src={avatarUrl(avatarSeed)}
                alt=""
                width={40}
                height={40}
                className={styles.avatarImg}
              />
            ) : (
              t('you')
            )}
          </div>
          <span className={styles.hintText}>{t('avatarHint')}</span>
        </div>
        <div className={styles.nameRow}>
          <div className={styles.name}>{t('title')}</div>
          <div className={styles.selectRow}>
            <div className={styles.locationGroup} ref={dropdownRef}>
              <button
                type="button"
                className={styles.locationTrigger}
                aria-haspopup="listbox"
                aria-expanded={countryOpen}
                onClick={() => {
                  const nextOpen = !countryOpen;
                  if (!nextOpen) setCountrySearch('');
                  setCountryOpen(nextOpen);
                }}
              >
                <span>{currentCountry.label}</span>
                <svg className={styles.chevron} width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {countryOpen && (
                <div className={styles.dropdownMenu} role="listbox" aria-label={t('selectCountry')}>
                  <input
                    type="search"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder={t('searchCountry')}
                    aria-label={t('searchCountry')}
                    className={styles.searchInput}
                  />
                  <div className={styles.optionsList}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={!location}
                      className={`${styles.optionButton} ${!location ? styles.optionActive : ''}`}
                      onClick={() => {
                        onLocationChange('');
                        setCountrySearch('');
                        setCountryOpen(false);
                      }}
                    >
                      {currentCountry.label}
                    </button>
                    {countryOptions.map((opt) => (
                      <button
                        key={opt.code}
                        type="button"
                        role="option"
                        aria-selected={opt.code === location}
                        className={`${styles.optionButton} ${opt.code === location ? styles.optionActive : ''}`}
                        onClick={() => {
                          onLocationChange(opt.code);
                          setCountrySearch('');
                          setCountryOpen(false);
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.genderWrap}>
              <div className={styles.genderGroup} role="radiogroup" aria-label={t('selectGender')}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={gender === 'm'}
                  onClick={() => onGenderChange(gender === 'm' ? undefined : 'm')}
                  className={`${styles.genderBtn} ${gender === 'm' ? styles.genderActive : ''}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 11v10M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {t('brother')}
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={gender === 'f'}
                  onClick={() => onGenderChange(gender === 'f' ? undefined : 'f')}
                  className={`${styles.genderBtn} ${gender === 'f' ? styles.genderActive : ''}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 11v8M8 19h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 14l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t('sister')}
                </button>
              </div>
              <span className={styles.hintText}>{t('genderHint')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => onTextChange(e.target.value.slice(0, 280))}
          rows={3}
          maxLength={280}
          placeholder={t('placeholder')}
          aria-label={t('textareaLabel')}
          className={styles.textarea}
        />
        <CharCounter current={text.length} />
      </div>

      <div className={styles.footer}>
        <EmojiPicker onEmojiSelect={insertEmoji} />
        <div className={styles.right}>
          <div className={styles.sendWrap}>
            <CornerRosette className={`${styles.rosette} ${styles.rosetteTL}`} />
            <CornerRosette className={`${styles.rosette} ${styles.rosetteTR}`} />
            <CornerRosette className={`${styles.rosette} ${styles.rosetteBL}`} />
            <CornerRosette className={`${styles.rosette} ${styles.rosetteBR}`} />
            <button
              type="button"
              onClick={handleSend}
              disabled={!text.trim() || isPending}
              aria-label={t('sendAria')}
              className={styles.sendBtn}
            >
              {isPending ? t('sending') : t('send')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
