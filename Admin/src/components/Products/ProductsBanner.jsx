import React from 'react';

const ProductsBanner = () => {
    return (
        <div className='bg-primary w-full h-auto px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-16 flex flex-col gap-4 items-start justify-start rounded-xl mt-10'>
            <p className="text-xs sm:text-sm text-gray-300 font-medium">September 12, 2024</p>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug sm:leading-relaxed md:leading-relaxed">
                Enjoy free home <br className="hidden sm:block" /> delivery this summer
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium">New collections with offers</p>
        </div>
    );
};

export default ProductsBanner;
