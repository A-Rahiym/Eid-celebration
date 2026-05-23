export default function Moon() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '7%',
        right: '10%',
        width: 96,
        height: 96,
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 38% 32%, #f7efcc 0%, #d4bc78 35%, #a07a38 65%, #5a3c10 90%)',
        boxShadow:
          '0 0 0 1px rgba(212,188,120,0.2), 0 0 30px 10px rgba(212,188,120,0.15), 0 0 80px 35px rgba(180,150,80,0.08), 0 0 150px 70px rgba(150,120,60,0.04)',
        animation: 'moonDrift 10s ease-in-out infinite',
      }}
      aria-hidden="true"
    >
      <div className="moon-crater c1" style={{ position: 'absolute', borderRadius: '50%', background: 'rgba(80,50,10,0.25)', width: 14, height: 14, top: '28%', left: '52%' }} />
      <div className="moon-crater c2" style={{ position: 'absolute', borderRadius: '50%', background: 'rgba(80,50,10,0.25)', width: 8, height: 8, top: '55%', left: '35%' }} />
      <div className="moon-crater c3" style={{ position: 'absolute', borderRadius: '50%', background: 'rgba(80,50,10,0.25)', width: 6, height: 6, top: '38%', left: '30%' }} />
      <div
        style={{
          position: 'absolute',
          inset: -14,
          borderRadius: '50%',
          border: '1px solid rgba(212,188,120,0.08)',
          boxShadow: 'inset 0 0 20px rgba(212,188,120,0.05)',
        }}
      />
    </div>
  );
}
