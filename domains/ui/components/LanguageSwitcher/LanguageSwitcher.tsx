'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { LANGUAGE_OPTIONS } from '@/constants/languages';
import styles from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('language');
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = LANGUAGE_OPTIONS.find((item) => item.locale === currentLocale) ?? LANGUAGE_OPTIONS[0];

  return (
    <div className={styles.switcher} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t('aria')}
        aria-expanded={open}
      >
        <span className={styles.icon}>{current.icon}</span>
        <span>{current.label}</span>
      </button>
      <div className={`${styles.menu} ${open ? styles.menuOpen : ''}`} role="menu">
        <div className={styles.menuHeader} aria-hidden="true">
          <span className={styles.menuTitle}>{t('changeLanguage')}</span>
          <span className={styles.menuOrnament} />
        </div>
        {LANGUAGE_OPTIONS.map((item) => (
          <button
            key={item.locale}
            type="button"
            role="menuitem"
            className={`${styles.option} ${item.locale === currentLocale ? styles.active : ''}`}
            onClick={() => {
              router.replace(pathname, { locale: item.locale });
              setOpen(false);
            }}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.optionLabel}>{item.name}</span>
            <span className={styles.optionCode}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
