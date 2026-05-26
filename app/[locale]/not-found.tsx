import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <section className={styles.page} aria-labelledby="not-found-heading">
      <span className={styles.code}>404</span>

      <h1 id="not-found-heading" className={styles.title}>
        You&rsquo;re not supposed to be here
      </h1>

      <p className={styles.subtitle}>
        This page has wandered off — like the moon before Eid.
        Let&rsquo;s get you back to the celebration.
      </p>

      <Link href="/" className={styles.link}>
        Return Home
      </Link>
    </section>
  );
}
