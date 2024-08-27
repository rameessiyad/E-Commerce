import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true); 
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname === '/' ? '' : location.pathname.replace(/^\/+/, ''); 

    const userInfo = localStorage.getItem('userInfo');

    const handleToggle = () => {
        setIsOpen(!isOpen); 
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    }

    return (
        <div className='overflow-hidden'>
            {/* Toggle Button for Mobile Screens */}
            <div className="fixed top-3 left-2 z-50 lg:hidden">
                <button onClick={handleToggle} className="text-xl p-2">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-16 left-0 w-64 bg-white text-black p-4 border-r border-gray-200 flex flex-col  transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:w-64 lg:top-16 lg:h-[calc(100vh-4rem)]`}
                style={{ height: 'calc(100vh - 4rem)' }}
            >
                <ul className="flex-grow overflow-y-auto">
                    <li className="my-3">
                        <Link
                            to="/"
                            className={`block p-2 rounded-lg hover:bg-primary hover:text-white ${currentPath === '' ? 'bg-primary text-white' : ''}`}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="my-3">
                        <Link
                            to="/products"
                            className={`block p-2 rounded-lg hover:bg-primary hover:text-white ${currentPath === 'products' || currentPath === 'products/add' || currentPath === 'products/edit/:id' ? 'bg-primary text-white' : ''}`}
                        >
                            Products
                        </Link>
                    </li>
                    <li className="my-3">
                        <Link
                            to="/order-lists"
                            className={`block p-2 rounded-lg hover:bg-primary hover:text-white ${currentPath === 'order-lists' ? 'bg-primary text-white' : ''}`}
                        >
                            Order Lists
                        </Link>
                    </li>
                    <li className="my-3">
                        <Link
                            to="/products-stock"
                            className={`block p-2 rounded-lg hover:bg-primary hover:text-white ${currentPath === 'products-stock' ? 'bg-primary text-white' : ''}`}
                        >
                            Products Stock
                        </Link>
                    </li>
                </ul>
                <div className="mt-auto">
                    <p
                        className="block p-2 rounded-lg text-black hover:bg-primary hover:text-white cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
