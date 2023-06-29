import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import TableScene from './TableScene';

function Scene() {

    return (
        <>
            <Canvas className="absolute w-full h-full z-30 top-0" camera={{ position: [0, 0, 500], far: 10000 }}>
                <TableScene />
            </Canvas>
        </>
    );
}

export default Scene;