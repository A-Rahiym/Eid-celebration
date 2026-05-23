import styles from './Navbar.module.css';

export default function NavLogo() {
  return (
    <a href="#" className={styles.logo} aria-label="Eid Together home">
      <span className={styles.logoIcon}>☽</span>
      <div>
        <div className={styles.logoText}>Eid Together</div>
        <div className={styles.logoSub}>Global Celebration Wall</div>
      </div>
    </a>
  );
}
