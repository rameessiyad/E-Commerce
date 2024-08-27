import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { BaseURL } from '../../api';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    // Fetch orders from the backend
    const fetchOrders = async () => {
        try {
            const response = await fetch(`${BaseURL}/order/all`, {
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
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Handle status change
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${BaseURL}/order/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            const updatedOrder = await response.json();
            console.log('Updated Order:', updatedOrder);

            // Update only the order that was changed
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? { ...order, status: updatedOrder.order.status }
                        : order
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 bg-gray-100 p-5 py-16 mt-10">
                <h1 className="text-3xl font-medium">Order List</h1>

                {/* Order list table */}
                <div className="overflow-x-auto mt-10">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md text-center">
                        <thead>
                            <tr className="bg-slate-100 border-b border-slate-200">
                                <th className="py-3 px-4 text-center text-xs md:text-base text-gray-600">Product Name</th>
                                <th className="py-3 px-4 text-center text-gray-600 text-xs md:text-base">Location</th>
                                <th className="py-3 px-4 text-center text-gray-600 text-xs md:text-base">Date</th>
                                <th className="py-3 px-4 text-center text-gray-600 text-xs md:text-base">Amount</th>
                                <th className="py-3 px-4 text-center text-gray-600 text-xs md:text-base">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {orders.map((order) =>
                                order.items.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200">
                                        <td className="py-3 px-4 flex items-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-10 h-10 hidden md:block sm:w-12 sm:h-12 mr-3"
                                            />
                                            <span>{item.name}</span>
                                        </td>
                                        <td className="py-3 px-4">{order.shippingAddress.town}</td>
                                        <td className="py-3 px-4">{formatDate(order.createdAt)}</td>
                                        <td className="py-3 px-4">₹{item.price}</td>
                                        <td className="py-3 px-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className="border border-gray-300 rounded p-1"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default OrderList;
