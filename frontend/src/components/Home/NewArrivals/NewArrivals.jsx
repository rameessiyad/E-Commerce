import React  from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

import './NewArrivals.css';
import ProductsSlider from '../../ProductsSlider/ProductsSlider';

const NewArrivals = () => {


    return (
        <div className='py-8 flex flex-col gap-10'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl md:text-4xl font-medium'>New Arrivals</h1>
                <Link
                    to='/shop'
                    className='relative text-black text-sm md:text-base group flex items-center'
                >
                    <span className='mr-2'>More Products</span>
                    <FaArrowRight size={16} />
                    <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full'></span>
                </Link>
            </div>
            {/* <div className='overflow-x-auto custom-scrollbar'>
                <div className='flex gap-4'>
                    {newArrivals.map((item) => (
                        <div className='card flex-shrink-0 bg-white shadow-lg gap-3 rounded-lg w-[150px] sm:w-[45%] md:w-[300px] md:h[500px]' key={item.id}>
                            <div className='bg-gray-100 flex flex-col gap-2 p-2 w-full items-center'>
                                <div className='flex flex-col gap-1 self-start'>
                                    <p className='bg-white px-2 font-semibold text-xs sm:text-sm'>NEW</p>
                                    <p className='bg-green-400 px-2 text-white font-semibold text-xs sm:text-sm'>-50%</p>
                                </div>
                                <img src={item.image} alt={item.title} className='w-[300px] md:w-[320px] h-[130px] sm:h-[150px] md:h-[230px] md:p-2 object-cover rounded-md' />
                                <button className='bg-black text-white py-1 sm:py-2 md:py-3 px-2 sm:px-4 rounded-md text-xs sm:text-sm'>Add to Cart</button>
                            </div>
                            <div className='flex flex-col items-start p-4 pb-8'>
                                <div className='flex gap-1 mb-1'>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar
                                            key={i}
                                            color={i < ratings[item.id] ? '#FFD700' : '#E0E0E0'}
                                            className='cursor-pointer'
                                            onClick={() => handleRatingClick(item.id, i + 1)}
                                        />
                                    ))}
                                </div>
                                <p className='text-xs sm:text-base font-semibold'>{item.title}</p>
                                <p className='text-xs sm:text-sm font-semibold mt-1'>₹ {item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
            <ProductsSlider />
        </div>
    );
}

export default NewArrivals;
