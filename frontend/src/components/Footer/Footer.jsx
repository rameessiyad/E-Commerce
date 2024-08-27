import React from 'react'
import LogoImg from '../../public/images/logo.jpg'
import { Link, useLocation } from 'react-router-dom'
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { TbBrandYoutube } from "react-icons/tb";
import NewsLetter from './NewsLetter';

const Footer = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/cart" && location.pathname !== "/checkout" && location.pathname !== "/order-complete" && location.pathname !== "/my-orders" ? <NewsLetter /> : null}
      <div className='flex flex-col px-4 md:px-16 lg:px-36 bg-primary'>
        {/* top footer */}
        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between py-8 lg:py-16 border-b border-gray-700'>
          <div className='flex flex-col lg:flex-row gap-6 lg:gap-10 items-start'>
            <div className='lg:pr-8 lg:border-r border-gray-700'>
              <img src={LogoImg} alt="logo" className='w-[100px] lg:w-[130px]' />
            </div>
            <div>
              <p className='text-gray-300 text-sm'>Mens Fashion Store</p>
            </div>
          </div>
          <div className='mt-6 lg:mt-0'>
            <ul className='flex flex-col md:flex-row gap-4 lg:gap-10 text-gray-300 text-sm'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/shop'>Shop</Link>
              </li>
              <li>
                <Link to='/all-products'>Products</Link>
              </li>
              <li>
                <Link to='/contact-us'>Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* bottom footer */}
        <div className='flex flex-col md:flex-row items-start justify-between py-4 lg:py-8'>
          <div className='flex flex-col md:flex-row items-start gap-4 lg:gap-8'>
            <div><span className='text-gray-300 text-xs'>Copyright © 2024 Mens Cart. All rights reserved</span></div>
            <div><span className='font-medium text-white text-xs cursor-pointer'>Privacy Policy</span></div>
            <div><span className='font-medium text-white text-xs cursor-pointer'>Terms of Use</span></div>
          </div>
          <div className='mt-6 md:mt-0 flex gap-5'>
            <FaInstagram size={24} color='white' className='cursor-pointer' />
            <SlSocialFacebook size={24} color='white' className='cursor-pointer' />
            <TbBrandYoutube size={24} color='white' className='cursor-pointer' />
          </div>
        </div>

      </div>
    </>

  )
}

export default Footer
