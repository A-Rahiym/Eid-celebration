import { getTranslations } from 'next-intl/server';
import styles from './Footer.module.scss';
import Container from '@/domains/ui/components/Container/Container';

export default async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className={styles.footer} role="contentinfo">
      <Container>
        <p className={styles.logo}>{t('brand')}</p>
        <p className={styles.arabic} lang="ar">
          {t('blessingArabic')}
        </p>
        <p className={styles.copy}>
          {t('copy')}
        </p>
      </Container>
    </footer>
  );
}
