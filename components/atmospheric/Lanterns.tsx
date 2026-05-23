import styles from './AtmosphericBackground.module.scss';

const LANTERN_CONFIGS = [
  { top: '12%', left: '8%', size: 18, color: 'rgba(201,169,110,0.55)', sw: 6, sd: 0 },
  { top: '18%', left: '22%', size: 12, color: 'rgba(255,140,60,0.45)', sw: 5, sd: -2 },
  { top: '8%', left: '38%', size: 15, color: 'rgba(61,184,156,0.35)', sw: 7, sd: -1 },
  { top: '22%', left: '55%', size: 10, color: 'rgba(201,169,110,0.40)', sw: 4, sd: -3 },
  { top: '14%', left: '68%', size: 20, color: 'rgba(255,160,80,0.50)', sw: 6, sd: -0.5 },
  { top: '10%', left: '80%', size: 14, color: 'rgba(201,169,110,0.45)', sw: 5, sd: -1.5 },
  { top: '26%', left: '88%', size: 11, color: 'rgba(61,184,156,0.30)', sw: 7, sd: -4 },
  { top: '20%', left: '45%', size: 8, color: 'rgba(240,200,100,0.35)', sw: 4, sd: -2.5 },
];

export default function Lanterns() {
  return (
    <div className={styles.lanternWrap} aria-hidden="true">
      {LANTERN_CONFIGS.map((c, i) => (
        <div
          key={i}
          className={styles.lantern}
          style={{
            top: c.top,
            left: c.left,
            width: c.size * 0.65,
            height: c.size,
            background: c.color,
            boxShadow: `0 0 ${c.size * 1.2}px ${c.color.replace(/[\d.]+\)$/, '0.3)')}`,
            animationDelay: `${c.sd}s`,
            ['--sw' as string]: `${c.sw}s`,
            ['--sd' as string]: `${c.sd}s`,
          }}
        />
      ))}
    </div>
  );
}
