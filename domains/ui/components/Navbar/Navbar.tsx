'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Navbar.module.scss';
import NavLogo from './NavLogo';
import MobileMenu from './MobileMenu';

export default function Navbar() {
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
          <Link href="/" className={styles.link} role="menuitem">
            Home
          </Link>
          <Link href="/board" className={styles.link} role="menuitem">
            Wall
          </Link>
          <Link href="/message" className={styles.link} role="menuitem">
            Share Wish
          </Link>
        </div>
        <MobileMenu />
      </div>
    </motion.nav>
  );
}