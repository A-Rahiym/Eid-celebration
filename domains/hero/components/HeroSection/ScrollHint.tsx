import { useTranslations } from 'next-intl';
import styles from './HeroSection.module.scss';

export default function ScrollHint() {
  const t = useTranslations('hero');

  return (
    <div className={styles.scrollHint} aria-hidden="true">
      <span className={styles.scrollText}>{t('scroll')}</span>
      <div className={styles.scrollMouse}>
        <div className={styles.scrollWheel} />
      </div>
    </div>
  );
}
