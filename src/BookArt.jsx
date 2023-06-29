import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import useAudio from './useAudio';

const BookArt = React.forwardRef(({ path = "", reveal = false, sound = null }, ref) => {

    const artRef = React.useRef(null);
    const soundObject = useAudio(sound, { volume: 0.1 });

    useEffect(() => {
        gsap.set(artRef.current, {
            autoAlpha: 0,
            opacity: 0
        });
    }, []);

    useEffect(() => {
        if (reveal) {
            showArt();
            soundObject.play();
        }

    }, [reveal])

    const showArt = useCallback(() => {
        gsap.to(artRef.current, {
            autoAlpha: 1,
            opacity : 1,
            ease: "power1.in",
            duration: 1,
        });
    }, [artRef.current]);

    return (
        <img ref={artRef} className="w-full h-full" src={path}></img >
    );
});

export default BookArt;