interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <h2
        style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: '2rem',
          fontWeight: 300,
          color: 'var(--ivory)',
          lineHeight: 1.2,
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: '0.82rem', color: 'var(--ivory-50)', letterSpacing: '0.03em' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
