import React, { useState } from 'react';
import Steps from '../../components/Steps';
import { useNavigate } from 'react-router-dom';

const OrderCompletePage = () => {
    const [currentStep, setCurrentStep] = useState(3);

    const navigate = useNavigate();

    return (
        <div className="mt-10 px-4 flex flex-col gap-5">
            <h1 className="text-4xl sm:text-5xl text-center font-medium mb-10">Order Complete</h1>
            <div className="flex items-center justify-between p-4">
                <Steps stepNumber={1} label="Shopping Cart" isActive={currentStep === 1} isCompleted={true} />
                <div className="h-1 w-8 sm:w-16 bg-gray-300"></div>
                <Steps stepNumber={2} label="Checkout Details" isActive={currentStep === 2} isCompleted={true} />
                <div className="h-1 w-8 sm:w-16 bg-gray-300"></div>
                <Steps stepNumber={3} label="Order Complete" isActive={currentStep === 3} isCompleted={true} />
            </div>
            <div className="text-center mt-8 flex flex-col gap-3 p-10 border items-center border-slate-400 w-fit mx-auto rounded-lg shadow-slate-400 shadow-lg mb-20">
                <p className="text-xl text-gray-500 font-medium">Thank you! 🎉</p>
                <p className="text-3xl font-medium">Your order has been <br /> received</p>
                <button
                    className="bg-primary text-white rounded-full mt-4 max-w-fit px-5 py-3"
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default OrderCompletePage;
