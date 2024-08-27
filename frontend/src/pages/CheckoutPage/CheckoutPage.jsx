import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Steps from '../../components/Steps';
import { BaseURL } from '../../api';
import { toast } from 'react-hot-toast'

const CheckoutPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [cartProducts, setCartProducts] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        shippingAddress: {
            streetAddress: '',
            town: '',
            state: '',
            pinCode: ''
        }
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const fetchCartProducts = async () => {
        try {
            const response = await fetch(`${BaseURL}/cart/`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart products');
            }

            const data = await response.json();
            const products = data.items.map((item) => ({
                id: item.product._id,
                title: item.product.name,
                price: item.product.price,
                image: item.product.images[0],
                quantity: item.quantity,
                color: item.color,
                subtotal: item.product.price * item.quantity
            }));

            setCartProducts(products);

            const total = products.reduce((acc, product) => acc + product.subtotal, 0);
            setCartTotal(total);

        } catch (error) {
            console.log('Error fetching cart products:', error);
        }
    };

    useEffect(() => {
        fetchCartProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setCurrentStep(2);
    }

    console.log(formData);

    const handleShippingAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            shippingAddress: {
                ...prevData.shippingAddress,
                [name]: value
            }
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`${BaseURL}/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    shippingAddress: formData.shippingAddress
                })
            });

            if (!response.ok) {
                setLoading(false);
                toast.error('Failed to create order');
                throw new Error('Failed to create order');
            }

            const result = await response.json();
            setLoading(false);
            toast.success('Order created successfully');
            setCurrentStep(3);
            navigate('/order-complete')

        } catch (error) {

        }
    }

    return (
        <div className="mt-10 px-4 flex flex-col gap-5">
            <h1 className="text-4xl sm:text-5xl text-center font-medium mb-10">Check Out</h1>
            <div className="flex items-center justify-between p-4">
                <Steps stepNumber={1} label="Shopping Cart" isActive={currentStep === 1} isCompleted={currentStep > 1} />
                <div className="h-1 w-8 sm:w-16 bg-gray-300"></div>
                <Steps stepNumber={2} label="Checkout Details" isActive={currentStep === 2} isCompleted={currentStep > 2} />
                <div className="h-1 w-8 sm:w-16 bg-gray-300"></div>
                <Steps stepNumber={3} label="Order Complete" isActive={currentStep === 3} isCompleted={currentStep > 3} />
            </div>

            <div className="flex flex-col md:flex-row gap-6">

                {/* Forms */}
                <div className="flex-1">
                    <form
                        className='flex flex-col py-10 gap-8'
                        onSubmit={handleSubmit}
                    >
                        {/* Contact Form */}
                        <div className="bg-white p-6 rounded-lg border border-primary shadow-lg">
                            <h2 className="text-lg font-medium mb-4">Contact Information</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className='flex flex-col flex-1'>
                                        <label htmlFor="firstName" className="mb-3 text-xs">FIRST NAME</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded px-3 py-2 w-full"
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col flex-1'>
                                        <label htmlFor="lastName" className="mb-3 text-xs">LAST NAME</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded px-3 py-2 w-full"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="phoneNumber" className="mb-3 text-xs">PHONE NUMBER</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="email" className="mb-3 text-xs">EMAIL ADDRESS</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded px-3 py-2"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white p-6 rounded-lg border border-primary shadow-lg">
                            <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                            <div className="flex flex-col gap-4">
                                <div className='flex flex-col'>
                                    <label htmlFor="streetAddress" className="mb-3 text-xs">STREET ADDRESS</label>
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        placeholder="Street Address"
                                        value={formData.shippingAddress.streetAddress}
                                        onChange={handleShippingAddressChange}
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                        required
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="town" className="mb-3 text-xs">TOWN</label>
                                    <input
                                        type="text"
                                        name="town"
                                        placeholder="Town"
                                        value={formData.shippingAddress.town}
                                        onChange={handleShippingAddressChange}
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className='flex flex-col flex-1'>
                                        <label htmlFor="state" className="mb-3 text-xs">STATE</label>
                                        <input
                                            type="text"
                                            name="state"
                                            placeholder="State"
                                            value={formData.shippingAddress.state}
                                            onChange={handleShippingAddressChange}
                                            className="border border-gray-300 rounded px-3 py-2 w-full"
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col flex-1'>
                                        <label htmlFor="pinCode" className="mb-3 text-xs">PIN CODE</label>
                                        <input
                                            type="text"
                                            name="pinCode"
                                            placeholder="Pin Code"
                                            value={formData.shippingAddress.pinCode}
                                            onChange={handleShippingAddressChange}
                                            className="border border-gray-300 rounded px-3 py-2 w-full"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-white p-6 rounded-lg border border-primary shadow-lg">
                            <h2 className="text-lg font-medium mb-4">Payment Method</h2>
                            <div className="flex flex-col gap-4">
                                <p className="font-medium text-xl">Cash on Delivery</p>
                            </div>
                        </div>

                        <button type="submit" className="w-full py-3 px-6 bg-primary text-white rounded hover:bg-primary-dark">Place Order</button>
                    </form>
                </div>

                {/* Cart Summary */}
                <div className="w-full md:w-80  bg-white p-6 rounded-lg shadow-lg max-h-svh overflow-auto pb-10">
                    <h2 className="text-lg font-medium mb-4">Cart Summary</h2>
                    <div className="flex flex-col gap-4">
                        {cartProducts.map(product => (
                            <div key={product.id} className="flex items-center gap-4">
                                <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded" />
                                <div className="flex-1">
                                    <h3 className="text-base font-medium">{product.title}</h3>
                                    <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                                    <p className="text-sm font-medium">Subtotal: ${product.subtotal.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between font-medium mt-4">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;
