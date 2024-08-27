import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import EditProductForm from '../../components/Products/EditProductForm';

const EditProduct = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 bg-gray-100 p-5 py-16 mt-10">
                <h1 className="text-3xl font-medium">EditProduct</h1>

                {/* form */}
                <EditProductForm />
            </main>
        </div>
    );
};

export default EditProduct;
