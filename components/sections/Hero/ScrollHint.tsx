export default function ScrollHint() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        animation: 'fadeUp 1.4s 0.9s ease both',
        opacity: 0.4,
      }}
      aria-hidden="true"
    >
      <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        Scroll
      </span>
      <div
        style={{
          width: 20,
          height: 30,
          border: '1px solid var(--ivory-25)',
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 5,
        }}
      >
        <div
          style={{
            width: 2,
            height: 5,
            borderRadius: 2,
            background: 'var(--ivory-50)',
            animation: 'scrollWheel 1.8s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}
