import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProductStockTable from '../../components/Products/ProductStockTable';

const ProductsStock = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 bg-gray-100 p-5 py-16 mt-10">
                <h1 className="text-3xl font-medium">Product Stock</h1>

                {/* table */}
                <ProductStockTable />
            </main>
        </div>
    );
};

export default ProductsStock;
