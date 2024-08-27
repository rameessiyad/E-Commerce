import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import ShoeImg from '../../public/images/shoe.png';
import WatchImg from '../../public/images/watch.png';
import HoodieImg from '../../public/images/hoodies.png';
import PerfumeImg from '../../public/images/spray.png';

const categories = [
    { name: 'Clothing', img: HoodieImg, link: 'category/Clothing' },
    { name: 'Footwear', img: ShoeImg, link: 'category/Footwear' },
    { name: 'Accessories', img: WatchImg, link: 'category/Accessories' },
    { name: 'Grooming', img: PerfumeImg, link: 'category/Grooming' },
];

const Categories = () => {
    return (
        <div className="w-full py-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="bg-gray-100 p-3 sm:p-4 md:p-6 flex flex-col items-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full"
                    >
                        <img
                            src={category.img}
                            alt={category.name}
                            className="w-full h-auto max-w-[100px] sm:max-w-[150px] md:max-w-[250px] object-cover rounded-md mb-3 sm:mb-4"
                        />
                        <h2 className="text-base sm:text-lg md:text-2xl font-medium mb-1 sm:mb-2 text-center">{category.name}</h2>
                        <Link
                            to={category.link}
                            className="text-black hover:text-black font-medium relative flex items-center group text-sm sm:text-base"
                        >
                            Shop Now
                            <FaArrowRight className="ml-2" />
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
