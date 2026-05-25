'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import styles from './LanguageSwitcher.module.scss';

const LOCALES = [
  { locale: 'en', label: 'EN', icon: '🌍' },
  { locale: 'ar', label: 'AR', icon: '🌙' },
  { locale: 'fr', label: 'FR', icon: '✨' },
  { locale: 'tr', label: 'TR', icon: '🕌' },
  { locale: 'id', label: 'ID', icon: '🌿' },
];

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

  const current = LOCALES.find((item) => item.locale === currentLocale) ?? LOCALES[0];

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
        {LOCALES.map((item) => (
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
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
