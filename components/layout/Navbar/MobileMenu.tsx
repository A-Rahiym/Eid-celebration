'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Wall', href: '#feed' },
  { label: 'Countries', href: '#countries' },
  { label: 'About', href: '#about' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
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
        <span className={`${styles.hamburgerLine} ${open ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${open ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${open ? styles.open : ''}`} />
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}

      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <nav className={styles.drawerNav} aria-label="Mobile navigation">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={styles.drawerLink}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
