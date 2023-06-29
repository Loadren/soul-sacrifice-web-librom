import { useRef, useEffect } from "react";
import { gsap, Power1 } from "gsap";

const useAudio = (src, { volume = 1, playbackRate = 1, loop = false, customLoop = { enabled : false, intro: 0, duration : 0 } }) => {
    const audio = useRef(new Audio(src))

    useEffect(() => {
        audio.current.fadeOut = (duration = 3) => {
            gsap.to(audio.current, {
                volume: 0,
                duration: 3
            })
        }

        audio.current.fadeOut = (duration = 3) => {
            gsap.to(audio.current, {
                volume: 0,
                duration: 3
            })
        }

        audio.current.customLoop = customLoop;

        if(!customLoop.enabled)
        return;

        audio.current.customLoop.interval = setInterval(() => {
            if(audio.current.currentTime > (audio.current.customLoop.duration + audio.current.customLoop.intro)){
                audio.current.currentTime = audio.current.currentTime - audio.current.customLoop.duration
            }
        }, 1)
    }, [])

    /*useEffect(() => {
        if(audio.current.currentTime > (audio.current.customLoop.duration + audio.current.customLoop.intro)){
            audio.current.currentTime = audio.current.currentTime - audio.current.customLoop.duration
        }
    }, [audio.current.currentTIme])*/

    useEffect(() => {
        audio.current.volume = volume
    }, [volume])

    useEffect(() => {
        audio.current.playbackRate = playbackRate
    }, [playbackRate])

    useEffect(() => {
        audio.current.loop = loop
    }, [loop])

    return audio.current
}

export default useAudio