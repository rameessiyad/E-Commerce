import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaStar } from 'react-icons/fa';
import ProductsSlider from '../../components/ProductsSlider/ProductsSlider';
import { useNavigate, useParams } from 'react-router-dom';
import { BaseURL } from '../../api';
import { toast } from 'react-toastify'

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        colors: [],
        images: []
    })

    const [ratings, setRatings] = useState(0);
    const [cart, setCart] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${BaseURL}/product/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }

                const data = await response.json();

                setProduct({
                    id: data._id,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    category: data.category.name,
                    colors: data.colors || [],
                    images: data.images || []
                });
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const fetchCart = async () => {
            try {
                const response = await fetch(`${BaseURL}/cart`, {
                    method: 'GEt',
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

        fetchProduct();
        fetchCart();
    }, [id])


    const handleRatingClick = (itemId, rating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [itemId]: rating,
        }));
    };

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
                body: JSON.stringify({ productId, quantity: 1 })
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
            }))

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
    }

    const quantityInCart = (productId) => {
        return cart[productId] || 0;
    }

    return (
        <div className='flex flex-col items-center justify-between p-4'>
            {/* {product.map((item) => ( */}
            <div className='flex flex-col md:flex-row items-center md:justify-between'>
                {/* Images Section */}
                <div className='w-full grid grid-cols-2 gap-2'>
                    {product.images.map((image, index) => (
                        <div key={index} className='w-full'>
                            <div className='bg-gray-100 p-1'>
                                <img
                                    src={image}
                                    alt="product"
                                    className='object-contain w-full h-[200px]'
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Description Section */}
                <div className='flex flex-col gap-4 md:ml-8 mt-4 md:mt-0'>
                    {/* Stars */}
                    <div className='flex gap-1 mb-4'>
                        {Array.from({ length: 5 }, (_, i) => (
                            <FaStar
                                key={i}
                                color={i < ratings[product.id] ? '#FFD700' : '#E0E0E0'}
                                className='cursor-pointer'
                                onClick={() => handleRatingClick(product.id, i + 1)}
                            />
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold mb-2">
                        {product.name}
                    </h1>

                    {/* Description */}
                    <p className='text-sm text-gray-500 mb-4'>
                        {product.description}
                    </p>

                    {/* Category */}
                    <p className='text-sm text-gray-500 mb-4 mt-2'>
                        <span className='text-gray-700'>Category:</span> {product.category}
                    </p>

                    {/* Price */}
                    <p className='text-2xl font-semibold mb-4'>
                        ₹ {product.price}
                    </p>

                    {/* Colors */}
                    <div className='mb-4'>
                        <p className='text-sm mb-3'>Available colors:</p>
                        <ul>
                            {product.colors.map((color, index) => (
                                <li key={index} className='text-sm text-gray-500 mb-2'>
                                    <span className='text-gray-700'></span> {color}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {quantityInCart(product.id) > 0 ? (
                        <div className='flex items-center justify-between mt-2 button'>
                            <button
                                className='text-xs sm:text-sm'
                                onClick={() => handleRemoveFromCart(product.id)}
                            >
                                <FaMinus />
                            </button>
                            <span className='text-xs sm:text-sm mx-2'>
                                {quantityInCart(product.id)}
                            </span>
                            <button
                                className='text-xs sm:text-sm'
                                onClick={() => handleAddToCart(product.id, 1)}
                            >
                                <FaPlus />
                            </button>
                        </div>
                    ) : (
                        <button
                            className="button"
                            onClick={() => handleAddToCart(product.id, 1)}
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
            {/* ))} */}

            {/* You might also like */}
            <div className='mt-10 py-10 w-full flex flex-col gap-8'>
                <h1 className="text-3xl font-medium">You might also like</h1>
                <ProductsSlider />
            </div>
        </div>

    );
};

export default ProductPage;
