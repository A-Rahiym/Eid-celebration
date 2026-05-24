'use client';

import styles from './AtmosphericBackground.module.scss';
import StarCanvas from './StarCanvas';
import ParticleCanvas from './ParticleCanvas';
import Moon from './Moon';
import Clouds from './Clouds';
import Terrain from './Terrain';
import MistBands from './MistBands';
import Lanterns from './Lanterns';
import GeometricWatermarks from './GeometricWatermarks';

export default function AtmosphericBackground() {
  return (
    <div className={styles.world} aria-hidden="true">
      <div className={styles.sky} />
      <StarCanvas />
      <Moon />
      <Clouds />
      <MistBands />
      <Terrain />
      <Lanterns />
      <ParticleCanvas />
      <GeometricWatermarks />
    </div>
  );
}
