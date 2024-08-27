import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaStar } from 'react-icons/fa';
import { BaseURL } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductsSlider = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    
    const navigate = useNavigate();

    const [ratings, setRatings] = useState(
        products.reduce((acc, item) => {
            acc[item.id] = item.rating;
            return acc;
        }, {})
    );

    const handleRatingClick = (itemId, rating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [itemId]: rating,
        }));
    };

    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                const response = await fetch(`${BaseURL}/product/latest`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                const productsData = data['All products'];
                setProducts(productsData);
                console.log(products)

            } catch (error) {
                console.log("Error fetching products", error)
            }
        };

        const fetchCart = async () => {
            try {
                const response = await fetch(`${BaseURL}/cart`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch cart');
                }

                const data = await response.json();
                const cartItems = data.items.reduce((acc, item) => {
                    acc[item.product._id] = item.quantity;
                    return acc;
                }, {});
                setCart(cartItems);

            } catch (error) {
                console.log('Error fetching cart', error);
            }
        }

        fetchLatestProducts();
        fetchCart();
    }, [])

    const handleAddToCart = async (productId, quantity) => {
        const userInfo = localStorage.getItem('userInfo');

        if (!userInfo) {
            toast.warning('Login to add product to cart');
            navigate('/login')
            return;
        }
        try {
            const response = await fetch(`${BaseURL}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ productId, quantity: 1 }),
            });

            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }

            const result = await response.json();
            setCart((prevCart) => ({
                ...prevCart,
                [productId]: (prevCart[productId] || 0) + quantity
            }))
        } catch (error) {
            console.log('Error adding product to cart', error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            const quantity = quantityInCart(productId);

            setCart((prevCart) => ({
                ...prevCart,
                [productId]: quantity > 1 ? quantity - 1 : 0,
            }));

            if (quantity > 1) {
                const response = await fetch(`${BaseURL}/cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ productId, quantity: -1 }),
                })

                if (!response.ok) {
                    throw new Error('Failed to remove product from cart');
                }

            } else {
                const response = await fetch(`${BaseURL}/cart/${productId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to remove product from cart');
                }

                setCart((prevCart) => {
                    const { [productId]: _, ...newCart } = prevCart;
                    return newCart;
                })
            }
        } catch (error) {
            console.log('Error removing product from cart', error);
        }
    };

    const quantityInCart = (productId) => {
        return cart[productId] || 0;
    };

    return (
        <div className='overflow-x-auto custom-scrollbar'>
            <div className='flex gap-4'>
                {products.map((item) => (
                    <div className='card flex-shrink-0 bg-white shadow-lg gap-3 rounded-lg w-[150px] sm:w-[45%] md:w-[300px] md:h[500px]' key={item._id}>
                        <div className='bg-gray-100 flex flex-col gap-2 p-2 w-full items-center'>
                            <div className='flex flex-col gap-1 self-start'>
                                <p className='bg-white px-2 font-semibold text-xs sm:text-sm'>NEW</p>
                                <p className='bg-green-400 px-2 text-white font-semibold text-xs sm:text-sm'>-50%</p>
                            </div>
                            <Link to={`/product/${item._id}`}>
                                <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className='w-[300px] md:w-[320px] h-[130px] sm:h-[150px] md:h-[230px] md:p-2 object-cover rounded-md'
                                />
                            </Link>
                            {quantityInCart(item._id) > 0 ? (
                                <div className='flex items-center justify-between mt-2 button'>
                                    <button
                                        className='text-xs sm:text-sm'
                                        onClick={() => handleRemoveFromCart(item._id)}
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className='text-xs sm:text-sm mx-2'>
                                        {quantityInCart(item._id)}
                                    </span>
                                    <button
                                        className='text-xs sm:text-sm'
                                        onClick={() => handleAddToCart(item._id, 1)}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className='button text-xs sm:text-sm mt-2'
                                    onClick={() => handleAddToCart(item._id, 1)}
                                >
                                    Add to Cart
                                </button>
                            )}

                        </div>
                        <div className='flex flex-col items-start p-4 pb-8'>
                            <div className='flex gap-1 mb-1'>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <FaStar
                                        key={i}
                                        color={i < ratings[item._id] ? '#FFD700' : '#E0E0E0'}
                                        className='cursor-pointer'
                                        onClick={() => handleRatingClick(item._id, i + 1)}
                                    />
                                ))}
                            </div>
                            <p className='text-xs sm:text-base font-semibold'>{item.name}</p>
                            <p className='text-xs sm:text-sm font-semibold mt-1'>₹ {item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductsSlider