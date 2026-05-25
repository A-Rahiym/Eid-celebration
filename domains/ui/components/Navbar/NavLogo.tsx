import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './Navbar.module.scss';

export default function NavLogo() {
  const t = useTranslations('nav');

  return (
    <Link href="/" className={styles.logo} aria-label={t('homeAria')}>
      <span className={styles.logoIcon}>☽</span>
      <div>
        <div className={styles.logoText}>{t('brand')}</div>
        <div className={styles.logoSub}>{t('tagline')}</div>
      </div>
    </Link>
  );
}
