import React from 'react';

const Step = ({ stepNumber, label, isActive, isCompleted }) => {
    return (
        <div className="flex flex-col items-center">
            <div
                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 ${isCompleted ? 'bg-green-500 border-green-500' : isActive ? 'bg-green-500' : 'bg-gray-300 border-gray-300'
                    } text-white font-semibold text-xs sm:text-base`}
            >
                {stepNumber}
            </div>
            <p className={`mt-2 text-xs sm:text-sm md:text-base ${isCompleted || isActive ? 'text-green-500' : 'text-gray-500'}`}>{label}</p>
        </div>
    );
};

export default Step;
