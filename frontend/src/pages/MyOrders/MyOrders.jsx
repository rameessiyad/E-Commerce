import React, { useEffect, useState } from 'react';
import { BaseURL } from '../../api';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${BaseURL}/order/my-orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            setOrders(data.orders);
            console.log(orders)

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-3xl font-medium text-center my-8">My Orders</h2>
            {orders.length === 0 ? (
                <div className='h-72'>
                    <p className='text-center text-3xl text-priamry font-bold'>No orders found.</p>
                </div>
            ) : (


                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left px-6 py-3 font-medium text-primary">Product Image</th>
                                <th className="text-left px-6 py-3 font-medium text-primary">Product Name</th>
                                <th className="text-left px-6 py-3 font-medium text-primary">Quantity</th>
                                <th className="text-left px-6 py-3 font-medium text-primary">Price</th>
                                <th className="text-left px-6 py-3 font-medium text-primary">Address</th>
                                <th className="text-left px-6 py-3 font-medium text-primary">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                order.items.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200">
                                        <td className="px-6 py-4">
                                            <img src={item.image} alt="image" className="w-12 h-12 object-cover rounded" />
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{item.name}</td>
                                        <td className="px-6 py-4 text-gray-700">{item.quantity}</td>
                                        <td className="px-6 py-4 text-gray-700">₹ {item.price}</td>
                                        <td className="px-6 py-4 text-gray-700">{order.shippingAddress.town}</td>
                                        <td className="px-6 py-4 text-gray-700 font-semibold">{order.status}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
