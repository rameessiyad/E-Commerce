import React, { useState } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import Logo from '../../public/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const userInfo = localStorage.getItem('userInfo');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="fixed top-0 left-0 w-full bg-white text-black flex items-center border-b border-gray-200 justify-between p-4 px-10 z-50">
            {/* Logo */}
            <div className="flex-shrink-0">
                <img src={Logo} alt="logo" className='w-40' />
            </div>

            {/* Search Bar */}
            <div className=" mx-10 w-[40%] hidden md:flex rounded-xl">
                <input
                    type="text"
                    placeholder="Search..."
                    className=" p-2 w-full rounded-full border border-gray-400 bg-gray-100 text-gray-800 outline-none"
                />
            </div>

            {/* User Icon and Label */}
            <div className="relative">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {userInfo ? (
                        <>
                            <HiOutlineUserCircle size={24} />
                            <span>Admin</span>
                        </>
                    ) : (
                        <Link to='/login'>
                            <button className='bg-primary text-white p-1 px-3 rounded-md'>Login</button>
                        </Link>
                    )}
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
