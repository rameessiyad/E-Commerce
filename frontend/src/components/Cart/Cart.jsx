import React, { useEffect, useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import { BaseURL } from '../../api';


const Cart = ({ setCart }) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [productCart, setProductCart] = useState({});

    const fetchCartProducts = async () => {
        try {
            const response = await fetch(`${BaseURL}/cart/`, {
                method: 'GET',
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error('Failed to fetch cart products');
            }

            const data = await response.json();
            console.log(data)
            const products = (data.items.map((item) => ({
                id: item.product._id,
                title: item.product.name,
                price: item.product.price,
                image: item.product.images[0],
                quantity: item.quantity,
                color: item.color,
                subtotal: item.product.price * item.quantity
            })))

            setCartProducts(products);

            // Calculate the total for the cart
            const total = products.reduce((acc, product) => acc + product.subtotal, 0);
            setCartTotal(total);

        } catch (error) {
            console.log('Error fetching cart products:', error);
        }
    }

    useEffect(() => {
        fetchCartProducts();
    }, [])

    const handleAddToCart = async (productId, quantity) => {
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
            setProductCart((prevProductCart) => ({
                ...prevProductCart,
                [productId]: (prevProductCart[productId] || 0) + quantity
            }))

            fetchCartProducts();

        } catch (error) {
            console.log('Error adding product to cart:', error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            const quantity = quantityInCart(productId);

            setProductCart((prevProductCart) => ({
                ...prevProductCart,
                [productId]: quantity > 1 ? quantity - 1 : 0,
            }));

            if (quantity > 1) {
                const response = await fetch(`${BaseURL}/cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
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

                setProductCart((prevProductCart) => {
                    const { [productId]: _, ...newCart } = prevProductCart;
                    return newCart;
                })
            }

            fetchCartProducts();

        } catch (error) {
            console.log('Error removing product from cart:', error);
        }
    }

    const quantityInCart = (productId) => {
        return productCart[productId] || 0;
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-end z-20'>
            <div className='bg-white w-full max-w-sm h-full p-4 overflow-y-auto transform transition-transform duration-300 translate-x-0 flex flex-col'>
                {/* Cart Header */}
                <div className='flex items-center justify-between mb-4'>
                    <h1 className="text-2xl font-semibold">Cart</h1>
                    <IoMdCloseCircle size={24} className='cursor-pointer' onClick={() => setCart(false)} />
                </div>

                {/* Cart Products */}
                {cartProducts.length === 0 ? (
                    <div className='flex-1 flex justify-center items-center'>
                        <p className='text-lg font-medium'>No products in cart</p>
                    </div>
                ) : (
                    <div className='flex-1 flex flex-col gap-4'>
                        {cartProducts.map((product, index) => (
                            <div key={index} className='flex items-center justify-between gap-4'>
                                <div className="bg-gray-100 p-2">
                                    <img src={product.image} alt={product.title} className='w-[55px] h-[55px] object-contain' />
                                </div>
                                <div className='flex-1'>
                                    <h2 className='font-medium'>{product.title}</h2>
                                    <p className='text-sm text-gray-500'>₹ {product.price}</p>
                                    <div className='flex items-center justify-center w-[80px] px-2 mt-2 border border-black'>
                                        <button
                                            className=' px-1 '
                                            onClick={() => handleRemoveFromCart(product.id)}
                                        >
                                            -
                                        </button>
                                        <span className='px-4'>{product.quantity}</span>
                                        <button
                                            className='px-1'
                                            onClick={() => handleAddToCart(product.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='text-sm font-medium'>₹ {product.subtotal}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Cart Footer */}
                {cartProducts.length > 0 && (
                    <div className='mt-auto'>
                        <div className='flex items-center justify-between mb-2'>
                            <p className='text-sm'>Subtotal</p>
                            <p className='text-sm font-medium my-1'>₹ {cartTotal}</p>
                        </div>
                        <div className='flex items-center justify-between font-medium mb-4'>
                            <p>Total</p>
                            <p className='my-1'>₹ {cartTotal}</p>
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <Link to='/checkout'><button className="button" onClick={() => setCart(false)}>Checkout</button></Link>
                            <Link to='/cart' className="text-black text-center font-medium" onClick={() => setCart(false)}>View Cart</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
