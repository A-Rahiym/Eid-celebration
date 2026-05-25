'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import CornerRosette from '@/domains/ui/components/icons/CornerRosette';

const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'wall', href: '/board' },
  { key: 'shareWish', href: '/message' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('nav');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        className={styles.hamburger}
        onClick={() => setOpen(!open)}
        aria-label={open ? t('closeMenu') : t('openMenu')}
        aria-expanded={open}
      >
        <span className={open ? styles.hamburgerLineOpen : styles.hamburgerLine} />
        <span className={open ? styles.hamburgerLineOpen : styles.hamburgerLine} />
        <span className={open ? styles.hamburgerLineOpen : styles.hamburgerLine} />
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}

      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <div className={styles.menuFrame} aria-hidden="true">
          <CornerRosette className={`${styles.menuCorner} ${styles.menuCornerTL}`} />
          <CornerRosette className={`${styles.menuCorner} ${styles.menuCornerTR}`} />
          <CornerRosette className={`${styles.menuCorner} ${styles.menuCornerBL}`} />
          <CornerRosette className={`${styles.menuCorner} ${styles.menuCornerBR}`} />
        </div>
        <nav className={styles.drawerNav} aria-label={t('mobileAria')}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={styles.drawerLink}
              onClick={() => setOpen(false)}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
