import React from 'react';
import { CiMail } from "react-icons/ci";

const NewsLetter = () => {
    return (
        <div className='py-10 flex items-center justify-center flex-col sm:flex-row gap-6 px-4 md:px-8'>
            <div className="flex flex-col gap-4 items-center justify-center w-full sm:w-[60%] lg:w-[40%] text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium">Join Our Newsletter</h1>
                <p className='text-sm sm:text-base md:text-lg'>Sign up for deals, new products, and promotions</p>
                <div className="w-full p-2 sm:p-3 flex gap-4 border-b border-gray-300 mt-4">
                    <CiMail size={24} />
                    <input
                        type="email"
                        placeholder='Email Address'
                        className='w-full outline-none text-sm sm:text-base md:text-lg'
                    />
                    <a
                        href='mailto:rameessiyad26@gmail.com'
                        className="text-sm sm:text-base md:text-lg hover:underline"
                    >
                        Send
                    </a>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter;
