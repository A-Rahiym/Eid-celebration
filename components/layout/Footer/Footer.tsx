import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <p className={styles.logo}>Eid Together</p>
      <p className={styles.arabic} lang="ar">
        تقبّل الله منا ومنكم
      </p>
      <p className={styles.copy}>
        &copy; 1446 AH · Celebrating humanity · Every Eid, worldwide
      </p>
    </footer>
  );
}
