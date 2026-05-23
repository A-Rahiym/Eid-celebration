import styles from './AtmosphericBackground.module.scss';

const CLOUDS = [
  { top: '14%', left: '5%', w: 280, h: 60, dur: 60, delay: 0, op: 0.06 },
  { top: '22%', left: '55%', w: 220, h: 45, dur: 80, delay: -20, op: 0.04 },
  { top: '10%', left: '70%', w: 320, h: 55, dur: 70, delay: -10, op: 0.05 },
  { top: '28%', left: '20%', w: 180, h: 35, dur: 90, delay: -40, op: 0.03 },
];

const cloudKeyframes = `@keyframes cloudDriftGen{0%{transform:translateX(-60px)}50%{transform:translateX(60px)}100%{transform:translateX(-60px)}}`;

export default function Clouds() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <style>{cloudKeyframes}</style>
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: c.top,
            left: c.left,
            width: c.w,
            height: c.h,
            opacity: c.op,
            animation: `cloudDriftGen ${c.dur}s ease-in-out infinite`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <div
            className={styles.cloudPuff}
            style={{
              width: c.w * 0.6,
              height: c.h * 1.4,
              top: -c.h * 0.3,
              left: c.w * 0.05,
            }}
          />
          <div
            className={styles.cloudPuff}
            style={{
              width: c.w * 0.5,
              height: c.h * 1.6,
              top: -c.h * 0.35,
              left: c.w * 0.25,
            }}
          />
          <div
            className={styles.cloudPuff}
            style={{
              width: c.w * 0.45,
              height: c.h * 1.3,
              top: -c.h * 0.2,
              left: c.w * 0.5,
            }}
          />
        </div>
      ))}
    </div>
  );
}
