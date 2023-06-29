import React, { useState } from 'react';
import SmokeScene from './SmokeScene';
import ContinueButton from './ContinueButton';
import ParticlesBackground from './ParticlesBackground';
import TableScene from './TableScene';
import Book from './Book';

const IntroScreen = () => {
    const [step, setStep] = useState(0);

    return (
        <div className="absolute h-screen w-screen z-20 top-0 left-0">
            <div className={`absolute w-full h-full z-40 top-0 left-0 ${step == 0 ? "" : "hidden"}`} >
                <TableScene setStep={setStep} />
            </div>

            <div className={`absolute w-full h-full z-40 top-0 left-0 ${step == 1 ? "visible" : "pointer-events-none invisible"}`} >
                <Book />
            </div>


            <div className="absolute w-full h-full z-10 top-0 left-0">
                <ParticlesBackground />
            </div>
        </div>

    );
};

export default IntroScreen;