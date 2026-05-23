export default function MistBands() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: '-10%',
          right: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse 100% 100%, rgba(16,36,90,0.22), transparent)',
          animation: 'mistDrift 14s ease-in-out infinite',
          bottom: '30%',
          height: 180,
          animationDelay: '-3s',
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: 'absolute',
          left: '-10%',
          right: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse 100% 100%, rgba(16,36,90,0.22), transparent)',
          animation: 'mistDrift 18s ease-in-out infinite',
          bottom: '15%',
          height: 120,
          animationDelay: '-9s',
        }}
        aria-hidden="true"
      />
    </>
  );
}
