import React from 'react';
import { Canvas } from '@react-three/fiber';
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

const TestScene = () => {
  return (
    <Canvas className="absolute w-full h-full z-20 top-0">
      <ambientLight />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[100, 100, 100]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </Canvas>
  );
}

export default TestScene;