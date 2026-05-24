'use client';

import { motion } from 'framer-motion';
import styles from './Navbar.module.scss';
import NavLogo from './NavLogo';
import LiveBadge from './LiveBadge';
import MobileMenu from './MobileMenu';

interface NavbarProps {
  liveCount: number;
}

export default function Navbar({ liveCount }: NavbarProps) {
  return (
    <motion.nav
      className={styles.nav}
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
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
    </motion.nav>
  );
}
