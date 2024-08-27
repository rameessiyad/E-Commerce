import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { BaseURL } from '../../api';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState('free');
    const [shippingCost, setShippingCost] = useState(0);

    const fetchCartProducts = async () => {
        try {
            const response = await fetch(`${BaseURL}/cart`, {
                method: 'GET',
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error('Failed to fetch cart products');
            }

            const data = await response.json();
            setCartProducts(data.items.map((item) => ({
                id: item.product._id,
                title: item.product.name,
                price: item.product.price,
                image: item.product.images[0],
                quantity: item.quantity,
                color: item.color,
                subtotal: item.product.price * item.quantity
            })))
        } catch (error) {
            console.log('Error fetching cart products:', error);
        }
    }

    useEffect(() => {
        fetchCartProducts();
    }, []);

    const handleShippingChange = (e) => {
        const shippingValue = e.target.value;
        setSelectedShipping(shippingValue);

        switch (shippingValue) {
            case 'express':
                setShippingCost(50);
                break;
            case 'pickup':
                setShippingCost(100);
                break;
            case 'free':
            default:
                setShippingCost(0);
                break;
        }
    };

    const handleRemoveProduct = async (productId) => {
        try {
            const response = await fetch(`${BaseURL}/cart/${productId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to remove product from cart');
            }

            fetchCartProducts();

        } catch (error) {
            console.log('Error removing product from cart:', error);
        }
    }

    const subtotal = cartProducts.reduce((total, product) => total + product.subtotal, 0);
    const total = subtotal + shippingCost;

    return (
        <div className="mt-10 px-4">
            <h1 className="text-4xl sm:text-5xl text-center font-medium mb-10">Cart</h1>
            {cartProducts.length === 0 ? (
                <div className="text-center text-lg font-medium">
                    <p>No products available in the cart.</p>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb:my-16 lg:my-20">
                    {/* table section */}
                    <div className="w-full md:w-2/3">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-primary text-left">
                                    <th className="py-2 sm:py-3 px-2 sm:px-4">Product</th>
                                    <th className="py-2 sm:py-3 px-2 sm:px-4">Quantity</th>
                                    <th className="py-2 sm:py-3 px-2 sm:px-4">Price</th>
                                    <th className="py-2 sm:py-3 px-2 sm:px-4">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartProducts.map((product) => (
                                    <tr className="border-b border-gray-200" key={product.id}>
                                        <td className="py-4 px-2 sm:px-4 flex items-center gap-4">
                                            <div className="bg-gray-100 p-2 hidden md:block">
                                                <img src={product.image} alt="product" className="w-10 h-10 sm:w-14 sm:h-14" />
                                            </div>
                                            <div className="flex flex-col">
                                                <h1 className="font-medium text-sm sm:text-base">{product.title}</h1>
                                                <p className="text-gray-400 text-xs sm:text-sm">Color: {product.color}</p>
                                                <p
                                                    className="flex items-center gap-1 text-red-600 cursor-pointer text-xs sm:text-sm"
                                                    onClick={() => handleRemoveProduct(product.id)}
                                                >
                                                    <IoMdClose size={18} />
                                                    <span>Remove</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 sm:px-4 text-sm">{product.quantity}</td>
                                        <td className="py-4 px-2 sm:px-4 text-sm">₹{product.price}</td>
                                        <td className="py-4 px-2 sm:px-4 text-sm">₹{product.subtotal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* cart summary */}
                    <div className="w-full md:w-1/3 p-4 sm:p-6 border border-primary rounded-lg shadow-sm">
                        <p className="text-lg font-medium mb-4">Cart Summary</p>

                        <form className="flex flex-col gap-3 mb-4">
                            <div className="flex justify-between items-center p-2 border border-primary rounded">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="free"
                                        checked={selectedShipping === 'free'}
                                        onChange={handleShippingChange}
                                    />
                                    <label>Free shipping</label>
                                </div>
                                <span>₹0</span>
                            </div>
                            <div className="flex justify-between items-center p-2 border border-primary rounded">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="express"
                                        checked={selectedShipping === 'express'}
                                        onChange={handleShippingChange}
                                    />
                                    <label>Express shipping</label>
                                </div>
                                <span>₹50</span>
                            </div>
                            <div className="flex justify-between items-center p-2 border border-primary rounded">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="pickup"
                                        checked={selectedShipping === 'pickup'}
                                        onChange={handleShippingChange}
                                    />
                                    <label>Pick up</label>
                                </div>
                                <span>₹100</span>
                            </div>
                        </form>

                        <div className="flex justify-between text-sm my-5">
                            <p>Subtotal</p>
                            <p className="font-medium">₹{subtotal}</p>
                        </div>
                        <div className="flex justify-between text-lg font-medium">
                            <p>Total</p>
                            <p>₹{total}</p>
                        </div>
                        {cartProducts.length > 0 && (
                            <Link to="/checkout"><button className="button w-full my-3">Checkout</button></Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
