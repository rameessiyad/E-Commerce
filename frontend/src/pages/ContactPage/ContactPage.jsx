import React from 'react';
import bannerImg from '../../public/images/contactBanner.jpg';
import contactImg from '../../public/images/contact.jpeg';

const ContactPage = () => {
    return (
        <div>
            <div className='w-full h-[150px] md:h-[400px] sm:h-[300px] relative'>
                <img src={bannerImg} alt="banner" className='w-full h-full object-cover' />
                <div className='flex flex-col p-4 gap-2 items-center bg-black bg-opacity-50 w-[40%] sm:w-[90%] md:w-[70%] h-[30%] sm:h-[40%] justify-center absolute top-0 bottom-0 left-0 right-0 m-auto'>
                    <h1 className="text-sm md:text-3xl sm:text-2xl text-white font-medium">Contact Page</h1>
                </div>
            </div>

            {/* Contact form */}
            <div className="flex flex-col md:flex-row items-center min-h-screen p-4 py-8 lg:mt-5 lg:py-10">
                {/* Image Section */}
                <div className="w-full hidden md:w-1/2 lg:flex justify-center items-center mb-8 md:mb-0">
                    <img
                        src={contactImg}
                        alt="Contact Us"
                        className="w-full h-auto object-cover shadow-lg"
                        style={{ maxHeight: '615px' }}
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/1 lg:w-1/2 bg-white p-10  shadow-lg border border-black">
                    <h2 className="text-3xl font-semibold mb-8 text-black text-center">Contact Us</h2>
                    <form>
                        {/* Name Field */}
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                                required
                            />
                        </div>

                        {/* Message Field */}
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                                required
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-black text-white py-3 px-6 rounded-md border border-black hover:bg-gray-800 focus:ring-black focus:border-black"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
