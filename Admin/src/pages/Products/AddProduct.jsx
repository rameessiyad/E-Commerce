import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import AddProductForm from '../../components/Products/AddProductForm';

const AddProduct = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 bg-gray-100 p-5 py-16 mt-10">
                <h1 className="text-3xl font-medium">AddProduct</h1>

                {/* form */}
                <AddProductForm />
            </main>
        </div>
    );
};

export default AddProduct;
