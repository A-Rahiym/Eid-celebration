'use client';

import { useTranslations } from 'next-intl';
import styles from './ComposeSection.module.scss';

interface GenderSelectorProps {
  gender: 'm' | 'f' | undefined;
  onGenderChange: (gender: 'm' | 'f' | undefined) => void;
}

function MaleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 11v10M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FemaleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 11v8M8 19h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 14l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GenderSelector({ gender, onGenderChange }: GenderSelectorProps) {
  const t = useTranslations('compose');

  return (
    <div className={styles.genderWrap}>
      <div className={styles.genderGroup} role="radiogroup" aria-label={t('selectGender')}>
        <button
          type="button"
          role="radio"
          aria-checked={gender === 'm'}
          onClick={() => onGenderChange(gender === 'm' ? undefined : 'm')}
          className={`${styles.genderBtn} ${gender === 'm' ? styles.genderActive : ''}`}
        >
          <MaleIcon />
          {t('brother')}
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={gender === 'f'}
          onClick={() => onGenderChange(gender === 'f' ? undefined : 'f')}
          className={`${styles.genderBtn} ${gender === 'f' ? styles.genderActive : ''}`}
        >
          <FemaleIcon />
          {t('sister')}
        </button>
      </div>
      <span className={styles.hintText}>{t('genderHint')}</span>
    </div>
  );
}
