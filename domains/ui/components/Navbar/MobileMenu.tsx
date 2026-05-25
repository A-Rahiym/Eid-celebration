'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import CornerRosette from '@/domains/ui/components/icons/CornerRosette';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Wall', href: '/board' },
  { label: 'Share Wish', href: '/message' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        className={styles.hamburger}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span className={open ? styles.hamburgerLineOpen : styles.hamburgerLine} />
        <span className={open ? styles.hamburgerLineOpen : styles.hamburgerLine} />
        <span className={open ? styles.hamburgerLineOpen : styles.hamburgerLine} />
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}

      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <div className={styles.menuFrame} aria-hidden="true">
          <CornerRosette className={`${styles.menuCorner} ${styles.menuCornerTL}`} />
          <CornerRosette className={`${styles.menuCorner} ${styles.menuCornerTR}`} />
          <CornerRosette className={`${styles.menuCorner} ${styles.menuCornerBL}`} />
          <CornerRosette className={`${styles.menuCorner} ${styles.menuCornerBR}`} />
        </div>
        <nav className={styles.drawerNav} aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.drawerLink}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
