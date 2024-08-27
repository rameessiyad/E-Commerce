import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FaUsers } from "react-icons/fa";
import { IoMdCube } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import Graph from '../../components/DashBoard/Graph/Graph';
import DealsDetails from '../../components/DashBoard/DealsDetails/DealsDetails';
import { BaseURL } from '../../api';

const DashBoard = () => {
    const [counts, setCounts] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalProducts: 0
    });

    const fetchCounts = async () => {
        try {
            const response = await fetch(`${BaseURL}/admin/dashboard-counts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch counts');
            }

            const data = await response.json();
            setCounts({
                totalUsers: data.totalUsers,
                totalOrders: data.totalOrders,
                totalProducts: data.totalProducts
            })

        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    }

    useEffect(() => {
        fetchCounts();
    }, [])

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 bg-gray-100 py-16 p-5 mt-10">
                <h1 className="text-3xl font-medium mb-8">Dashboard</h1>

                {/* Counts section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    <div className='bg-white p-6 flex items-center justify-between shadow-md rounded-lg'>
                        <div className='flex flex-col gap-2'>
                            <p className="text-gray-500 font-medium text-sm">Total Users</p>
                            <p className="text-3xl font-medium text-black">{counts.totalUsers}</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <FaUsers size={30} color='blue' className='rounded-lg bg-blue-300 w-8 h-8' />
                        </div>
                    </div>
                    <div className='bg-white p-6 flex items-center justify-between shadow-md rounded-lg'>
                        <div className='flex flex-col gap-2'>
                            <p className="text-gray-500 font-medium text-sm">Total Orders</p>
                            <p className="text-3xl font-medium text-black">{counts.totalOrders}</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <IoMdCube size={30} color='yellow' className='rounded-lg bg-yellow-50 w-8 h-8' />
                        </div>
                    </div>
                    <div className='bg-white p-6 flex items-center justify-between shadow-md rounded-lg'>
                        <div className='flex flex-col gap-2'>
                            <p className="text-gray-500 font-medium text-sm">Total Products</p>
                            <p className="text-3xl font-medium text-black">{counts.totalProducts}</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <AiFillProduct size={30} color='orange' className='rounded-lg bg-orange-200 w-8 h-8' />
                        </div>
                    </div>
                </div>

                {/* graph section    */}
                <div className='mt-10'>
                    <Graph />
                </div>

                {/* deals details */}
                <div className="mt-20 hidden md:block">
                    <DealsDetails />
                </div>
            </main>
        </div>
    );
};

export default DashBoard;
