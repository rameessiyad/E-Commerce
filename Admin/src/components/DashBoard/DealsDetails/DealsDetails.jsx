import React, { useEffect, useState } from 'react';
import { BaseURL } from '../../../api';
import { Link } from 'react-router-dom';

const DealsDetails = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${BaseURL}/order/latest`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            if (!response.ok) {
                throw new Error('Failed to fetch orders')
            }

            const data = await response.json();
            setOrders(data.orders);

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className='py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-md bg-white'>
            <p className="text-2xl font-medium mb-6">Deals Details</p>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-slate-100 border-b border-gray-200">
                            <th className="py-3 px-4 text-left text-xs md:text-base text-gray-600">Product Name</th>
                            <th className="py-3 px-4 text-left text-gray-600 text-xs md:text-base">Location</th>
                            <th className="py-3 px-4 text-left text-gray-600 text-xs md:text-base">Date-Time</th>
                            <th className="py-3 px-4 text-left text-gray-600 text-xs md:text-base">Amount</th>
                            <th className="py-3 px-4 text-left text-gray-600 text-xs md:text-base">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            order.items.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-3 px-4 flex items-center">
                                        <img src={item.image} alt={item.name} className='w-10 h-10 hidden md:block sm:w-12 sm:h-12 mr-3' />
                                        <span>{item.name}</span>
                                    </td>
                                    <td className="py-3 px-4">{order.shippingAddress.town}</td>
                                    <td className="py-3 px-4">{formatDate(order.createdAt)}</td>
                                    <td className="py-3 px-4">₹{item.price}</td>
                                    <td className="py-3 px-4">
                                        <span className='text-white bg-slate-400 rounded-full px-3 py-1 text-sm'>{order.status}</span>
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>

                </table>
            </div>
            <div className="flex justify-center mt-6">
                <Link to='/order-lists' className='text-center font-medium border border-primary text-primary px-3 py-1 rounded-full'>
                    View More
                </Link>
            </div>
        </div>
    );
}

export default DealsDetails;
