'use client';

import styles from './Navbar.module.css';
import NavLogo from './NavLogo';
import LiveBadge from './LiveBadge';
import MobileMenu from './MobileMenu';

interface NavbarProps {
  liveCount: number;
}

export default function Navbar({ liveCount }: NavbarProps) {
  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <div className={styles.inner}>
        <NavLogo />

        <div className={styles.center} role="menubar">
          <button className={styles.link} role="menuitem" tabIndex={0}>
            Wall
          </button>
          <button className={styles.link} role="menuitem" tabIndex={0}>
            Countries
          </button>
          <button className={styles.link} role="menuitem" tabIndex={0}>
            About
          </button>
        </div>

        <LiveBadge liveCount={liveCount} />
        <MobileMenu />
      </div>
    </nav>
  );
}
