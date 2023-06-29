import React from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, PlaneGeometry, MeshLambertMaterial, Mesh, BoxGeometry } from 'three';
import * as THREE from 'three';

const SmokeParticles = () => {
  const smokeTexture = useLoader(TextureLoader, '/0002.png');
  const smokeGeometry = React.useMemo(() => new PlaneGeometry(300, 300), []);
  const smokeMaterial = React.useMemo(() => new MeshLambertMaterial({ map: smokeTexture, emissive: 0x222222, opacity: 0.05, transparent: true, depthWrite: false}), [smokeTexture]);
  const smokeParticlesRef = React.useRef([]);
  const [clock, setClock] = React.useState(null);

  // On mount
  React.useMemo(() => {
    for (let i = 0; i < 90; i++) {
      const smoke_element = new Mesh(smokeGeometry, smokeMaterial);
      smoke_element.scale.set(1, 1, 1);
      smoke_element.position.set(
        Math.random() * 400 - 200, // Adjusted spread
        Math.random() * 400 - 500, // Adjusted spread
        Math.random() * 200 - 200 // Adjusted spread
    );
      smoke_element.rotation.z = Math.random() * 360;
      smokeParticlesRef.current.push(smoke_element);
    }

    setClock(new THREE.Clock())

  }, [smokeGeometry, smokeMaterial]);

  // On frame
  useFrame((state, delta) => {
    for (let i = 0; i < smokeParticlesRef.current.length; i++) {
      smokeParticlesRef.current[i].rotation.z += delta * 0.02;
    }
  });

  return (
    <>
      <hemisphereLight color={0xd6e6ff} groundColor={0xa38c08} intensity={1} />
      <fog attach={"fog"} color={0xc0f0ff} near={15}></fog>
      <mesh position={[0, 0, 1]}>
        {smokeParticlesRef.current.map((smokeParticle, i) => (
          <primitive key={i} object={smokeParticle} />
        ))}
      </mesh>
    </>
  );
};

export default SmokeParticles;