import React, { useEffect, useState } from 'react';
import bannerImg from '../../public/images/productsBanner.jpg';
import { Link, useParams } from 'react-router-dom';
import { BaseURL } from '../../api';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await fetch(`${BaseURL}/product/category/${categoryName}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching category products:', error);
            } finally {
                setLoading(false); // Set loading to false once data fetching is complete
            }
        };

        fetchCategoryProducts();
    }, [categoryName]);

    if (loading) {
        return (
            <div className="text-center py-4">
                <p className="text-lg">Loading products...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return <div className="text-center py-4">No products found in this category.</div>;
    }

    return (
        <div>
            <div className='relative w-full h-[150px] md:h-[400px] sm:h-[300px]'>
                <img src={bannerImg} alt="banner" className='w-full h-full object-cover' />
                <div className='flex p-4 gap-2 items-center bg-black bg-opacity-50 absolute inset-0 m-auto flex-col justify-center'>
                    <h1 className="text-sm md:text-3xl sm:text-2xl text-white font-medium text-center">{categoryName}</h1>
                    <p className="text-white text-center hidden md:block md:text-base sm:text-sm">Find the best products</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <Link to={`/product/${product._id}`} key={product._id} className="block">
                            <div className="product-card bg-white shadow-lg rounded-lg hover:shadow-lg transition-shadow duration-300 p-4">
                                <div className="bg-gray-100">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-1/2 md:h-3/4 object-contain rounded-t-lg"
                                        style={{ height: '200px' }}
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-sm md:text-lg font-semibold truncate">{product.name}</h2>
                                    <p className="text-gray-700">₹ {product.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
