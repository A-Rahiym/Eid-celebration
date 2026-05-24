import styles from './Footer.module.scss';
import Container from '@/domains/ui/components/Container/Container';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <Container>
        <p className={styles.logo}>Eid Together</p>
        <p className={styles.arabic} lang="ar">
          تقبّل الله منا ومنكم
        </p>
        <p className={styles.copy}>
          &copy; 1446 AH · Celebrating humanity · Every Eid, worldwide
        </p>
      </Container>
    </footer>
  );
}
