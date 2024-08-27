import React from 'react';
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiWallet } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { PiPhoneCallThin } from "react-icons/pi";

const services = [
    { icon: <LiaShippingFastSolid size={40} />, title: "Free Shipping", desc: "Order above ₹200" },
    { icon: <CiWallet size={40} />, title: "Money-back", desc: "30 days guarantee" },
    { icon: <CiLock size={40} />, title: "Secure Payments", desc: "Secured by Stripe" },
    { icon: <PiPhoneCallThin size={40} />, title: "24/7 Support", desc: "Phone and Email support" },
]

const Services = () => {
    return (
        <div className='py-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {services.map((service, index) => (
                <div key={index} className='flex flex-col items-start gap-3 bg-gray-100 p-6 rounded-md shadow-sm h-auto md:h-[200px]'>
                    <div className='text-black mb-2'>{service.icon}</div>
                    <h1 className='text-base sm:text-xl font-medium'>{service.title}</h1>
                    <p className="text-xs sm:text-base text-gray-500">{service.desc}</p>
                </div>
            ))}
        </div>
    )
}

export default Services;
