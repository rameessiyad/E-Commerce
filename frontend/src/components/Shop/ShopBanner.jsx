import React from 'react'
import shopImg from '../../public/images/shoppage.jpeg'

const ShopBanner = () => {
    return (
        <div className='w-full h-[150px] md:h-[400px] sm:h-[300px] relative'>
            <img src={shopImg} alt="banner" className='w-full h-full object-cover' />
            <div className='flex flex-col p-4 gap-2 items-center bg-black bg-opacity-50 w-[40%] sm:w-[90%] md:w-[70%] h-[30%] sm:h-[40%] justify-center absolute top-0 bottom-0 left-0 right-0 m-auto'>
                <h1 className="text-sm md:text-3xl sm:text-2xl text-white font-medium">Shop Page</h1>
                <p className="text-white text-center hidden md:block md:text-base sm:text-sm">Let's design the place you always imagined</p>
            </div>
        </div>
    )
}

export default ShopBanner
