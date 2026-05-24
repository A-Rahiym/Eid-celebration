import styles from './AtmosphericBackground.module.scss';

export default function Moon() {
  return (
    <div className={styles.moon} aria-hidden="true">
      <div className={styles.moonCrescent} />
      <div className={styles.moonRing} />
    </div>
  );
}
