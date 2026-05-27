'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './Navbar.module.scss';
import NavLogo from './NavLogo';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from '@/domains/ui/components/LanguageSwitcher/LanguageSwitcher';
import AboutModal from '@/domains/ui/components/AboutModal/AboutModal';

export default function Navbar() {
  const t = useTranslations('nav');
  const [aboutOpen, setAboutOpen] = useState(false);
  const openAbout = useCallback(() => setAboutOpen(true), []);
  const closeAbout = useCallback(() => setAboutOpen(false), []);

  return (
    <>
      <motion.nav
        className={styles.nav}
        role="navigation"
        aria-label={t('aria')}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className={styles.inner}>
          <NavLogo />

          <div className={styles.center} role="menubar">
            <Link href="/" className={styles.link} role="menuitem">
              {t('home')}
            </Link>
            <Link href="/board" className={styles.link} role="menuitem">
              {t('wall')}
            </Link>
            <Link href="/message" className={styles.link} role="menuitem">
              {t('shareWish')}
            </Link>
            <button type="button" className={styles.link} onClick={openAbout}>
              {t('about')}
            </button>
          </div>
          <div className={styles.actions}>
            <LanguageSwitcher />
            <MobileMenu onOpenAbout={openAbout} />
          </div>
        </div>
      </motion.nav>
      <AboutModal open={aboutOpen} onClose={closeAbout} />
    </>
  );
}