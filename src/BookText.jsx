import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import useAudio from './useAudio';

const BookText = React.forwardRef(({ text = "", from = "top", reveal = false, stop = false, sound = null, coloredLetters = [] }, ref) => {
    const lettersRef = useRef([]);

    const soundObject = useAudio(sound, { volume: 0.2 });

    useEffect(() => {
        gsap.set(lettersRef.current, {
            autoAlpha: 0,
            rotation: () => (Math.random() > 0.5 ? Math.round(Math.random() * -2) : Math.round(Math.random() * 2)),
            scale: () => (Math.random() > 0.5 ? 1 + Math.random() * 0.05 : 1 - Math.random() * 0.05),
            y: () => `${from == "top" ? -Math.random() * 1 : Math.random() * 1}em`,
        });
    }, []);

    useEffect(() => {
        if (reveal) {
            showText();
            soundObject.play();
        }


    }, [reveal])

    useEffect(() => {
        if (stop) {
            showText();
            soundObject.pause();
            soundObject.currentTime = 0;
        }


    }, [stop])

    const showText = useCallback(() => {
        gsap.to(lettersRef.current, {
            autoAlpha: 1,
            y: () => `${Math.random() * 0.5}rem`,
            ease: "power1.out",
            duration: 1,
            color: (i) => coloredLetters.find((colorConfigIteration) => colorConfigIteration.from <= i && colorConfigIteration.to >= i)?.color || "black"
        });
    }, [lettersRef.current]);

    const chooseLetter = useCallback((letter) => {
        switch (letter) {
            case " ":
                return "\u00A0"
            case "\n":
                return ""
            default:
                return letter;
        }
    }, []);

    const words = text.split(" ");

    return (
        <div ref={ref}>
            {
                words.map((word, index) => {
                    return <span className="inline-block" key={"word-" + index}>
                        {
                            word.split('').map((letter, i) => (
                                <span className={`inline-block`}
                                    key={word + "-letter-" + i}
                                    ref={(el) => { lettersRef.current.push(el) }}
                                >
                                    {chooseLetter(letter)}
                                </span>))
                        }

                        <span className={`inline-block`}
                            ref={(el) => { lettersRef.current.push(el) }}
                        >
                            {'\u00A0'}
                        </span>

                    </span>
                })
            }
        </div>
    );
});

export default BookText;