import React from 'react';
import { Canvas } from '@react-three/fiber';
import SmokeParticles from './SmokeParticles';

const SmokeScene = () => {
  return (
    <Canvas className="absolute w-full h-full z-20 top-0">
      <SmokeParticles />
    </Canvas>
  );
}

export default SmokeScene;