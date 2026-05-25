'use client';

import styles from './Navbar.module.scss';

export default function LiveBadge() {
  return (
    <div className={styles.navRight}>
      <div className={styles.liveBadge} aria-live="polite">
        <div className={styles.pulse} aria-hidden="true" />
        <span>Live</span>
      </div>
    </div>
  );
}
