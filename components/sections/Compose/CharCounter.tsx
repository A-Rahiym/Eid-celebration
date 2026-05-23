interface CharCounterProps {
  current: number;
  max?: number;
}

export default function CharCounter({ current, max = 280 }: CharCounterProps) {
  return (
    <span
      aria-live="polite"
      style={{
        fontSize: '0.68rem',
        color: 'var(--ivory-25)',
      }}
    >
      {current} / {max}
    </span>
  );
}
