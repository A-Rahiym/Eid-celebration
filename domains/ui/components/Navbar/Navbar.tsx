'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './Navbar.module.scss';
import NavLogo from './NavLogo';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from '@/domains/ui/components/LanguageSwitcher/LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');

  return (
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
        </div>
        <div className={styles.actions}>
          <LanguageSwitcher />
          <MobileMenu />
        </div>
      </div>
    </motion.nav>
  );
}