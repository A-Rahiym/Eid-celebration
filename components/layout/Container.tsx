interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

export default function Container({
  children,
  maxWidth = 'var(--max-w)',
  className = '',
}: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth,
        margin: '0 auto',
        padding: '0 2rem',
      }}
    >
      {children}
    </div>
  );
}
