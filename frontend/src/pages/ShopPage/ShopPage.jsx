import React, { useEffect, useState } from 'react';
import ShopBanner from '../../components/Shop/ShopBanner';
import { useNavigate, Link } from 'react-router-dom';
import { FaStar, FaMinus, FaPlus } from 'react-icons/fa';
import { BaseURL } from '../../api';
import { toast } from 'react-toastify';

const ShopPage = () => {
    const categories = ['All', 'Clothing', 'Footwear', 'Accessories', 'Grooming'];

    const [products, setProducts] = useState([]);
    const [ratings, setRatings] = useState({});
    const [cart, setCart] = useState({});
    const [category, setCategory] = useState('All');

    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${BaseURL}/product`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            const productsData = data['All products'];
            setProducts(productsData);

            // Initialize ratings state with fetched products
            const initialRatings = productsData.reduce((acc, item) => {
                acc[item._id] = item.rating;
                return acc;
            }, {});
            setRatings(initialRatings);
        } catch (error) {
            console.log('Error fetching products', error);
        }
    };

    const fetchProductsByCategory = async (selectedCategory) => {
        try {
            const response = await fetch(`${BaseURL}/product/category/${selectedCategory}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products by category');
            }
            const data = await response.json();
            const productsData = data;
            setProducts(productsData);

            // Initialize ratings state with fetched products
            const initialRatings = productsData.reduce((acc, item) => {
                acc[item._id] = item.rating;
                return acc;
            }, {});
            setRatings(initialRatings);
        } catch (error) {
            console.log('Error fetching products by category', error);
        }
    };

    const fetchCart = async () => {
        try {
            const response = await fetch(`${BaseURL}/cart`, {
                method: 'GET',
                credentials: 'include',
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
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    useEffect(() => {
        if (category === 'All') {
            fetchProducts();
        } else {
            fetchProductsByCategory(category);
        }
    }, [category]);

    const handleAddToCart = async (productId, quantity = 1) => {
        const userInfo = localStorage.getItem('userInfo');

        if (!userInfo) {
            toast.warning('Login to add product to cart');
            navigate('/login');
            return;
        }
        try {
            const response = await fetch(`${BaseURL}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ productId, quantity }),
            });

            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }

            
            setCart((prevCart) => ({
                ...prevCart,
                [productId]: (prevCart[productId] || 0) + quantity,
            }));
        } catch (error) {
            console.log('Error adding product to cart', error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            const currentQuantity = quantityInCart(productId);

            setCart((prevCart) => ({
                ...prevCart,
                [productId]: currentQuantity > 1 ? currentQuantity - 1 : 0,
            }));

            if (currentQuantity > 1) {
                const response = await fetch(`${BaseURL}/cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ productId, quantity: -1 }),
                });

                if (!response.ok) {
                    throw new Error('Failed to decrease product quantity');
                }

                const updatedCart = await response.json();
                const newCart = updatedCart.items.reduce((acc, item) => {
                    acc[item.product._id] = item.quantity;
                    return acc;
                }, {});
                setCart(newCart);
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
                });
            }
        } catch (error) {
            console.error('Error removing product from cart', error);
        }
    };

    const quantityInCart = (productId) => {
        return cart[productId] || 0;
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div>
            {/* banner */}
            <ShopBanner />
            {/* products filter */}
            <div className='py-10 flex items-start gap-3'>
                {/* Category Dropdown */}
                <div className='flex flex-col'>
                    <label className='text-gray-500 font-medium mb-1 uppercase'>Categories</label>
                    <select
                        className='border border-gray-300 rounded px-3 py-2 bg-white'
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* products here */}
            <div className='py-10 w-full flex flex-col items-center'>
                <div className='flex flex-wrap items-center justify-center gap-4'>
                    {products.map((item) => (
                        <div
                            className='bg-white shadow-sm rounded-lg w-[150px] sm:w-[45%] md:w-[300px] lg:w-[220px] flex-shrink-0 flex flex-col p-4'
                            key={item._id}
                        >
                            <div className='bg-gray-100 flex flex-col gap-2 p-3 w-full'>
                                <div className='flex flex-col gap-1 self-start'>
                                    <p className='bg-white px-2 font-semibold text-xs sm:text-sm'>NEW</p>
                                    <p className='bg-green-400 px-2 text-white font-semibold text-xs sm:text-sm'>-50%</p>
                                </div>
                                <Link to={`/product/${item._id}`}>
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className='w-full h-[100px] sm:h-[150px] object-cover rounded-md'
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
                                        <span className='text-xs sm:text-sm mx-2'>{quantityInCart(item._id)}</span>
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
                            <div className='flex flex-col p-4'>
                                <div className='flex gap-1 mb-1'>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar
                                            key={i}
                                            color={i < ratings[item._id] ? '#FFD700' : '#E0E0E0'}
                                            className='cursor-pointer'
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
        </div>
    );
}

export default ShopPage;
