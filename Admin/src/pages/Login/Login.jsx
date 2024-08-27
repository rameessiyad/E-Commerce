import React, { useState } from 'react';
import AuthImg from '../../public/images/auth.png';
import { IoEyeOutline } from "react-icons/io5";
import Logo from '../../public/images/logo.png';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BaseURL } from '../../api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice';
import { IoMdEyeOff } from 'react-icons/io';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            if (formData.usernameOrEmail !== 'admin' && formData.usernameOrEmail !== 'admin@gmail.comm') {
                setLoading(false);
                toast.error('Only admin can login here');
                return;
            }
            const res = await fetch(`${BaseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await res.json();

            if (!res.ok) {
                setLoading(false);
                toast.error(data.message);
                return;
            }

            dispatch(setCredentials(data.user));
            setLoading(false);

            navigate('/');

        } catch (error) {
            console.log("Error in login", error);
            toast.error('Login failed, try again');
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-between w-full h-screen">
            {/* Left Section */}
            <div className="w-full md:w-[50%] h-[15vh] md:h-full bg-gray-100 p-2 flex flex-col justify-between items-center overflow-hidden">
                <div className="flex justify-center md:mb-4 my-4 md:my-0"><img src={Logo} alt="logo" className='w-40' /></div>
                <div className="hidden md:flex">
                    <img src={AuthImg} alt="img" className="w-[440px]" />
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-[50%] h-full p-5 bg-white flex items-center justify-center">
                <div className="flex flex-col gap-5 p-3 w-full md:w-[500px]">
                    <h1 className="text-4xl font-medium">Admin Login</h1>

                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                        <div className="py-2">
                            <input
                                type="text"
                                placeholder="Your username or email address"
                                name='usernameOrEmail'
                                value={formData.usernameOrEmail}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-gray-200 p-1 outline-none"
                            />
                        </div>
                        <div className="py-2 relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-gray-200 p-1 outline-none"
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
                                {showPassword ?
                                    <IoMdEyeOff size={22} onClick={() => setShowPassword(false)} /> :
                                    <IoEyeOutline size={22} onClick={() => setShowPassword(true)} />}
                            </span>
                        </div>
                        <div className="py-2 flex justify-between">
                            <div>
                                <p className="font-semibold cursor-pointer">Forgot password?</p>
                            </div>
                        </div>
                        <div>
                            <button disabled={loading} className="bg-primary text-white p-2 w-full px-3 rounded-lg font-medium" type='submit'>{loading ? 'Loading...' : 'Login'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;