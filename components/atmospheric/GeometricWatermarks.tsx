export default function GeometricWatermarks() {
  return (
    <>
      <svg
        style={{
          position: 'absolute',
          top: '8%',
          left: '2%',
          width: 200,
          height: 200,
          opacity: 0.03,
          pointerEvents: 'none',
        }}
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <g fill="none" stroke="rgba(201,169,110,1)" strokeWidth="0.6">
          <polygon points="100,10 187,55 187,145 100,190 13,145 13,55" />
          <polygon points="100,32 165,65 165,135 100,168 35,135 35,65" />
          <polygon points="100,54 143,77 143,123 100,146 57,123 57,77" />
          <line x1="100" y1="10" x2="100" y2="190" />
          <line x1="13" y1="55" x2="187" y2="145" />
          <line x1="13" y1="145" x2="187" y2="55" />
          <circle cx="100" cy="100" r="25" />
        </g>
      </svg>

      <svg
        style={{
          position: 'absolute',
          bottom: '22%',
          right: '2%',
          width: 160,
          height: 160,
          opacity: 0.025,
          pointerEvents: 'none',
        }}
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <g fill="none" stroke="rgba(61,184,156,1)" strokeWidth="0.6">
          <circle cx="100" cy="100" r="88" />
          <circle cx="100" cy="100" r="62" />
          <circle cx="100" cy="100" r="36" />
          <polygon points="100,12 188,100 100,188 12,100" />
          <polygon points="100,36 164,100 100,164 36,100" />
        </g>
      </svg>
    </>
  );
}
