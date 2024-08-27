import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseURL } from '../../api';

const ProductsRow = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the backend
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${BaseURL}/product/latest`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                const productsData = data['All products'];
                setProducts(productsData);


            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='py-10 w-full flex flex-col items-center bg-white rounded-lg shadow-md'>
            <div className='flex flex-wrap items-center justify-center gap-4'>
                {products.map((item) => (
                    <div className='bg-white shadow-sm rounded-lg w-[150px] sm:w-[45%] md:w-[300px] lg:w-[220px] flex-shrink-0 flex flex-col p-4' key={item._id}>
                        <div className='bg-gray-100 flex flex-col gap-2 p-3 w-full'>
                            {item.images && item.images.length > 0 ? (
                                <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className='w-full h-[100px] sm:h-[150px] object-cover rounded-md'
                                />
                            ) : (
                                <div className='w-full h-[100px] sm:h-[150px] bg-gray-300 flex items-center justify-center rounded-md'>
                                    <span className='text-gray-500'>No Image</span>
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col p-4'>
                            <p className='text-xs sm:text-base font-semibold'>{item.name}</p>
                            <p className='text-xs sm:text-sm font-semibold mt-1'>₹ {item.price}</p>
                            <Link to={`edit/${item._id}`}>
                                <button className='bg-slate-200 text-black py-1 sm:py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm mt-2'>Edit Product</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Link to='/products-stock' className='mt-8 bg-white border border-black text-black py-2 px-4 rounded-full font-semibold text-sm hover:bg-gray-100 transition duration-200'>
                Show More
            </Link>
        </div>
    );
};

export default ProductsRow;
