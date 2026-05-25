'use client';

import Image from 'next/image';
import type { RefObject } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import styles from './ComposeSection.module.scss';
import EmojiPicker from './EmojiPicker';
import CharCounter from './CharCounter';
import CornerRosette from '@/domains/ui/components/icons/CornerRosette';
import { COUNTRY_OPTIONS } from '@/domains/messages/constants/countries';
import { getCountryName } from '@/lib/utils';
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

  return (
    <div className={styles.card} role="form" aria-label={t('formLabel')}>
      <div className={styles.cardGlow} />

      <div className={styles.header}>
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
        <div className={styles.nameRow}>
          <div className={styles.name}>{t('title')}</div>
          <div className={styles.selectRow}>
            <div className={styles.selectWrap}>
              <select
                value={location}
                onChange={e => onLocationChange(e.target.value)}
                aria-label={t('selectCountry')}
                className={styles.locationSelect}
              >
                {COUNTRY_OPTIONS.map((opt) => {
                  const label = opt.code
                    ? `${opt.flag} ${getCountryName(opt.code, locale)}`
                    : `${opt.flag} ${t('everywhere')}`;

                  return (
                    <option key={opt.code || 'global'} value={opt.code}>
                      {label}
                    </option>
                  );
                })}
              </select>
              <svg className={styles.chevron} width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
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
      </div>

      <div className={styles.footer}>
        <EmojiPicker onEmojiSelect={insertEmoji} />
        <div className={styles.right}>
          <CharCounter current={text.length} />
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
