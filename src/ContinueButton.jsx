import React from 'react';

const ContinueButton = ({ onClick }) => {
    return (
        <button 
            onClick={onClick} 
            className="bg-green-500 text-white py-3 px-8 text-center inline-block text-lg mx-1 my-2 cursor-pointer rounded-lg z-10"
        >
            Continue
        </button>
    );
};

export default ContinueButton;