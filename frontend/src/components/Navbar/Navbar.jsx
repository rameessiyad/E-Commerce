import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { RiSearchLine } from "react-icons/ri";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";
import { RiMenu3Line } from "react-icons/ri";
import Cart from '../Cart/Cart';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice'; // Adjust the import based on your file structure

const Navbar = () => {
  const [topNavbar, setTopNavbar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  return (
    <div className='w-full sticky top-0 z-10'>
      {cart && <Cart setCart={setCart} />}
      <div className=''>
        {/* Top Navbar */}
        <div className={topNavbar ? 'w-full px-4 bg-gray-200 flex items-center justify-center border-b border-gray-300' : 'hidden'}>
          <div className='w-full flex items-center justify-center p-2 relative'>
            <p className='font-medium text-xs md:text-sm flex gap-2'>
              <GiSandsOfTime size={20} className='hidden md:block' />
              30% off storewide - Limited time!
              <Link className='text-blue-600'>Shop Now &#8594;</Link>
            </p>
            <span
              className='text-xl absolute right-0 cursor-pointer'
              onClick={() => setTopNavbar(false)}
            >
              <IoCloseOutline size={24} />
            </span>
          </div>
        </div>

        {/* Bottom Navbar */}
        <div className='bg-white border-b border-gray-300 flex items-center justify-between px-4 py-2 md:px-8 md:py-3'>
          {/* Logo */}
          <div className='flex-shrink-0 md:ml-20'>
            <Link to='/'><Logo /></Link>
          </div>

          {/* Navigation Links for Larger Screens */}
          <ul className='hidden md:flex items-center gap-8 text-sm font-medium'>
            <li><Link to="/" className={location.pathname === '/' ? 'text-black' : 'text-gray-500'}>Home</Link></li>
            <li><Link to="/shop" className={location.pathname === '/shop' ? 'text-black' : 'text-gray-500'}>Shop</Link></li>
            <li><Link to="/all-products" className={location.pathname === '/all-products' || location.pathname === '/product/:id' ? 'text-black' : 'text-gray-500'}>Products</Link></li>
            <li><Link to="/my-orders" className={location.pathname === '/my-orders' ? 'text-black' : 'text-gray-500'}>My Orders</Link></li>
            <li><Link to="/contact-us" className={location.pathname === '/contact-us' ? 'text-black' : 'text-gray-500'}>Contact Us</Link></li>
          </ul>

          {/* Icons for Larger Screens */}
          <div className='hidden md:flex gap-4'>
            <RiSearchLine size={24} className='cursor-pointer' />
            <LiaShoppingBagSolid size={24} className={userInfo && location.pathname !== '/cart' && location.pathname !== '/checkout' && location.pathname !== '/order-complete' ? 'cursor-pointer' : 'hidden'} onClick={() => setCart(!cart)} />
            {
              userInfo ?
                <div className='relative'>
                  <HiOutlineUserCircle
                    size={24}
                    className='cursor-pointer'
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  {dropdownOpen && (
                    <div className='absolute right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md py-2 w-48'>
                      <p className='px-4 py-2 text-gray-700'>{userInfo.username}</p>
                      <button
                        className='w-full text-left px-4 py-2 text-black font-medium hover:bg-gray-100'
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                : <Link to='/login'><button className='bg-primary text-white px-3 py-1 text-sm rounded-md'>Login</button></Link>
            }
          </div>

          {/* Mobile Menu Toggle */}
          <div className='md:hidden flex items-center gap-4'>
            <span
              className='text-xl cursor-pointer'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <IoCloseOutline size={24} /> : <RiMenu3Line size={24} />}
            </span>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-white border-t border-gray-300 z-50 md:hidden transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex flex-col items-center p-4'>
            <div className='w-full flex justify-end mb-4'>
              <span
                className='text-xl cursor-pointer'
                onClick={() => setMobileMenuOpen(false)}
              >
                <IoCloseOutline size={24} />
              </span>
            </div>
            <Link to="/" className='py-3 text-lg font-medium transition-colors duration-300 hover:text-blue-600 w-full text-center' onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="shop" className='py-3 text-lg font-medium transition-colors duration-300 hover:text-blue-600 w-full text-center' onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link to="/all-products" className='py-3 text-lg font-medium transition-colors duration-300 hover:text-blue-600 w-full text-center' onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <Link to="/my-orders" className='py-3 text-lg font-medium transition-colors duration-300 hover:text-blue-600 w-full text-center' onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
            <Link to="contact-us" className='py-3 text-lg font-medium transition-colors duration-300 hover:text-blue-600 w-full text-center' onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
            <div className='flex gap-6 mt-6'>
              <RiSearchLine size={24} className='cursor-pointer' />
              <LiaShoppingBagSolid size={24} className={userInfo && location.pathname !== '/cart' && location.pathname !== '/checkout' && location.pathname !== '/order-complete' ? 'cursor-pointer' : 'hidden'} onClick={() => {
                setCart(!cart)
                setMobileMenuOpen(false)
              }} />
              {
                userInfo ?
                  <HiOutlineUserCircle
                    size={24}
                    className='cursor-pointer'
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  : <Link to='/login'><button className='bg-primary text-white rounded-md px-2 py-1 text-sm'>Login</button></Link>
              }
            </div>
            {dropdownOpen && (
              <div className='absolute right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md py-2 w-48'>
                <p className='px-4 py-2 text-gray-700'>{userInfo.username}</p>
                <button
                  className='w-full text-left px-4 py-2 text-black hover:bg-gray-100'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
