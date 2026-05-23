import styles from './AtmosphericBackground.module.scss';

export default function Moon() {
  return (
    <div className={styles.moon} aria-hidden="true">
      <div className={styles.c1} />
      <div className={styles.c2} />
      <div className={styles.c3} />
      <div className={styles.ring} />
    </div>
  );
}
