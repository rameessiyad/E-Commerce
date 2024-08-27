import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProductsBanner from '../../components/Products/ProductsBanner';
import ProductsRow from '../../components/Products/ProductsRow';
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Products = () => {
    return (
        <div className="flex relative">
            <Sidebar />
            <main className="flex-1 bg-gray-100 p-5 py-16 mt-10">
                <h1 className="text-3xl font-medium">Products</h1>

                {/* banner */}
                <ProductsBanner />

                {/* products row */}
                <div className="mt-10">
                    <ProductsRow />
                </div>

                {/* Add Product Button */}
                <Link to='add'>
                    <button
                        className="fixed bottom-10 right-5 bg-white text-black text-sm md:text-2xl p-2 md:p-5 
                    rounded-md md:rounded-lg shadow-slate-500 shadow-md md:shadow-lg border border-slate-300 
                    hover:shadow-black hover:shadow-lg transition duration-300 flex items-center justify-center gap-4"
                    >
                        Add New Product
                        <span className="text-sm md:text-xl"><FaPlus /></span>
                    </button>
                </Link>
            </main>
        </div>
    );
};

export default Products;
