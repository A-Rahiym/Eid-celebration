import styles from './AtmosphericBackground.module.scss';

export default function MistBands() {
  return (
    <>
      <div
        className={styles.mist}
        style={{ bottom: '30%', height: 180, animationDelay: '-3s' }}
        aria-hidden="true"
      />
      <div
        className={styles.mist}
        style={{ bottom: '15%', height: 120, animationDelay: '-9s' }}
        aria-hidden="true"
      />
    </>
  );
}
