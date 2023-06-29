import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {

    const particlesInit = React.useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = React.useCallback(async container => {

        const colorUpdate = () => {
            const particles = container.particles?.array;

            if (!particles) {
                requestAnimationFrame(colorUpdate);
                return;
            }

            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];
                // Interpolate hue from 0 (red) to 60 (yellow)
                const hue = (particle.position.y / window.innerHeight) * 60;
                // Set saturation and lightness to full (100%)
                particle.color = {
                    h: { enable: true, value: hue, velocity: 0 },
                    l: { enable: true, value: hue, velocity: 0 },
                    s: { enable: true, value: hue, velocity: 0 }
                };

            }
            requestAnimationFrame(colorUpdate);
        };
        colorUpdate();
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#000000",
                    },
                },
                fpsLimit: 60,
                particles: {
                    color: {
                        value: ["#ff4500", "#ffa500", "#ffff00"],  // colors of embers
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "top",  // particles move upwards
                        enable: true,
                        random: true,  // movement is random
                        outMode: "out",
                        speed: 2,  // adjust speed as needed
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            value_area: 800,
                        },
                        value: 100,  // adjust number of particles as needed
                    },
                    opacity: {
                        value: 0.5
                    },
                    shape: {
                        type: "image",
                        image: [
                            {
                                src: "/particles.jpg",
                                width: 100,
                                height: 100,
                            },
                        ],
                    },
                    size: {
                        random: true,
                        value: 3,
                    },
                },
                detectRetina: true,
            }}
            style={{
                width: '100%',
                position: 'absolute'
            }}
        />
    );
};

export default ParticlesBackground;