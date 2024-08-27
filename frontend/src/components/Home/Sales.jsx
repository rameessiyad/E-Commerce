import React from 'react';
import salesImg from '../../public/images/sale.jpg';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Sales = () => {
    return (
        <div className='my-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-100'>
            <div className='hidden md:flex flex-1'>
                <img src={salesImg} alt="sales" className='w-full h-full object-cover' />
            </div>
            <div className='flex-1 flex flex-col items-center md:items-start text-left md:text-left'>
                <div className='flex flex-col gap-3 max-w-lg ml-0 md:ml-10'>
                    <p className='uppercase font-bold text-blue-500'>save up to 35% off</p>
                    <div className='flex flex-col gap-2 text-xl md:text-2xl lg:text-3xl font-medium'>
                        <h1>HUNDREDS of</h1>
                        <h1>New lower prices!</h1>
                    </div>
                    <div className='flex flex-col gap-2 text-sm md:text-base'>
                        <p>It's more affordable than ever to give every</p>
                        <p>room in your home a stylish makeover</p>
                    </div>
                    <Link
                        to='/shop'
                        className='relative mt-3 text-black flex items-center group'
                    >
                        <span className='mr-1 text-sm'>Shop Now</span>
                        <FaArrowRight size={14} />
                        <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-[33%]'></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sales;
