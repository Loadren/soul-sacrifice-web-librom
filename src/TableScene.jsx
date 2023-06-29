import ReactDOM from "react-dom/client";
import React, {
    useRef,
    useState,
    useContext,
    useCallback,
    Suspense
} from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { Html, Loader } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three';
import { gsap, Back } from "gsap";

import useAudio from './useAudio';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2()

// Table component represents a 3D model of a table and manages interactions with the table
const Table = ({ ...props }) => {
    const gltf = useLoader(GLTFLoader, '/table/table.gltf');

    const raycasterRef = useRef(raycaster);
    const [highlight, setHighlight] = useState(false);
    const { scene, camera } = useThree();

    const pointerRef = useRef(pointer);
    const [hovered, setHovered] = useState(false)
    const [canAct, setCanAct] = useState(true)

    const tableBGM = useAudio('/sound/env_title.mp3', { volume: 0.01, loop: true })
    const clickBookAudio = useAudio('/sound/click.mp3', { volume: 0.02 })
    const bookBGM = useAudio('/sound/looped_book_ost.mp3', { volume: 0.03, customLoop: { enabled: true, intro: 33.601, duration: 79.948 } })
    const enterBookAudio = useAudio('/sound/enter_book.mp3', { volume: 0.02 })

    // Function to start playing the table background music
    const startTableBGM = React.useCallback(() => {
        tableBGM.play();
    }, [tableBGM]);

    // Function to track the position of the mouse pointer
    const handleMouseMove = useCallback((event) => {
        pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointerRef.current.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }, []);

    // Function to change the cursor from default state to a pointer and vice versa when we hover items that you can interact with
    React.useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    React.useEffect(() => {
        camera.position.set(0, 1, 4)
        camera.rotation.set(-1, 0, 0)

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("click", startTableBGM);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("click", startTableBGM);
        };
    }, []);

    // Function to manage transition from the table scene to the book scene
    const clickBook = useCallback(() => {
        ActionSolver(() => {
            return new Promise((resolve, reject) => {
                gsap.to(camera.position, {
                    x: 0.07,
                    y: 0.25,
                    z: 3.6,
                    duration: 2,
                    ease: Back.easeIn.config(1.7)
                })
                gsap.to(camera.rotation, {
                    x: -0.9,
                    duration: 2,
                    ease: Back.easeIn.config(1.7)
                }).then(resolve);
                tableBGM.fadeOut(5);
                clickBookAudio.play();
                bookBGM.play();
                enterBookAudio.play();
            })
        }, hovered, () => { props.setStep(1) })
    }, [camera, tableBGM, clickBookAudio, bookBGM, enterBookAudio, hovered, props]);

    const ActionSolver = useCallback((wrappedActionPromiseFunction, conditions, callback) => {
        return new Promise((resolve, reject) => {
            if (!canAct) return reject("Can't do that now!");
            if (conditions !== undefined && !conditions) return reject("Conditions not met!");

            setCanAct(false);
            // We unwrap the action here (a Promise)
            const action = wrappedActionPromiseFunction();

            //then we resolve the action when the resolve function has been triggered
            action.then(() => {
                setCanAct(true);
                if (typeof callback == "function") callback();
                resolve();
            });

        });
    }, []);

    const isDescendant = useCallback((obj, parentObj) => {
        while (obj !== null) {
            if (obj === parentObj) {
                return true;
            }
            obj = obj.parent;
        }
        return false;
    }, []);

    useFrame(() => {
        // Checking if raycaster is properly initialized
        if (!raycasterRef.current?.intersectObjects)
            return

        // Updating the raycaster with the current mouse position
        raycasterRef.current.setFromCamera(pointerRef.current, camera);

        // Using the raycaster to calculate an array of intersected objects
        var intersects = raycasterRef.current.intersectObjects(scene.children);

        let intersectedBook = false;

        for (var intersect of intersects) {
            // Checking if the intersected object is a descendant of the first child of the table scene (here, the book)
            if (isDescendant(intersect.object, gltf.scene.children[0]) && canAct) {
                intersectedBook = true;

                // If it is, update the hovered state and animate the emissive color of the book object
                if (!hovered)
                    setHovered(true);
                for (var child of gltf.scene.children[0].children[0].children) {
                    gsap.to(child.material.emissive, { b: 0, g: 0.02, r: 0.05, isColor: true, duration: 1 })
                }
            }
        }

        // If the book isn't being intersected by the raycaster, reset its emissive color and update the hovered state
        if (!intersectedBook) {
            for (var child of gltf.scene.children[0].children[0].children) {
                gsap.to(child.material.emissive, { b: 0, g: 0, r: 0, isColor: true, duration: 1 })
            }
            if (hovered)
                setHovered(false);
        }

    });

    return (
        <mesh {...props}>
            <primitive object={gltf.scene} onClick={clickBook} />
        </mesh>

    );
};


function TableScene(props) {

    return (
        <Canvas className="absolute w-full h-full z-30 top-0" camera={{ far: 10000 }}>
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={<Html><Loader /></Html>}>
                <EffectComposer smaa>
                    <Bloom mipmapBlur luminanceThreshold={0} />
                </EffectComposer>
                <Table setStep={props.setStep} position={[0, -1, 3]} />
            </Suspense>
        </Canvas>
    );
}

export default TableScene;