'use client';

import StarCanvas from './StarCanvas';
import ParticleCanvas from './ParticleCanvas';
import Moon from './Moon';
import Terrain from './Terrain';
import MistBands from './MistBands';
import Lanterns from './Lanterns';
import GeometricWatermarks from './GeometricWatermarks';

export default function AtmosphericBackground() {
  return (
    <div
      className="world"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 90% 55% at 50% -5%, #1a2e6e 0%, transparent 65%),
            radial-gradient(ellipse 55% 45% at 85% 15%, #12304a 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 10% 25%, #1a0f50 0%, transparent 50%),
            radial-gradient(ellipse 70% 60% at 50% 80%, #050e18 0%, transparent 70%),
            linear-gradient(180deg, #0b1535 0%, #07102a 30%, #060d1e 60%, #040912 100%)
          `,
        }}
      />

      <StarCanvas />
      <Moon />
      <MistBands />
      <Terrain />
      <Lanterns />
      <ParticleCanvas />
      <GeometricWatermarks />
    </div>
  );
}
