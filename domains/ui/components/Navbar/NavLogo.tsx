import Link from 'next/link';
import styles from './Navbar.module.scss';

export default function NavLogo() {
  return (
    <Link href="/" className={styles.logo} aria-label="Eid Together home">
      <span className={styles.logoIcon}>☽</span>
      <div>
        <div className={styles.logoText}>Eid Together</div>
        <div className={styles.logoSub}>Global Celebration Wall</div>
      </div>
    </Link>
  );
}
