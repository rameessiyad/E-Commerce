import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BaseURL } from '../../api';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const DeleteModal = ({ showModal, closeModal, confirmDelete }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-medium mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete this product?</p>
                <div className="flex justify-end mt-4 space-x-2">
                    <button onClick={closeModal} className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
                        Close
                    </button>
                    <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductStockTable = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${BaseURL}/product`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            const productsData = data['All products'];
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteClick = (productId) => {
        setSelectedProductId(productId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProductId(null);
    };

    const confirmDelete = async () => {
        if (selectedProductId) {
            try {
                await fetch(`${BaseURL}/product/${selectedProductId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                toast.success('Product Deleted');
                fetchProducts();
                closeModal();
            } catch (error) {
                console.log('Error deleting product:', error);
            }
        }
    };

    return (
        <div className='w-full mt-10'>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
                    <thead className='bg-gray-100 text-gray-600 border-b border-gray-300'>
                        <tr>
                            <th className='p-4 text-left'>Image</th>
                            <th className='p-4 text-left'>Product Name</th>
                            <th className='p-4 text-left hidden md:table-cell'>Category</th>
                            <th className='p-4 text-left'>Price</th>
                            <th className='p-4 text-left hidden md:table-cell'>Stock</th>
                            <th className='p-4 text-left hidden md:table-cell'>Available Colors</th>
                            <th className='p-4 text-left'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className='border-b'>
                                <td className='p-4'>
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className='w-12 h-12 object-cover rounded-full'
                                    />
                                </td>
                                <td className='p-4'>{product.name}</td>
                                <td className='p-4 hidden md:table-cell'>{product.category.name}</td>
                                <td className='p-4'>${product.price}</td>
                                <td className='p-4 hidden md:table-cell'>{product.stock}</td>
                                <td className='p-4 hidden md:table-cell'>
                                    <div className='flex space-x-2'>
                                        {product.colors.map((color, index) => (
                                            <div
                                                key={index}
                                                className='w-6 h-6 rounded-full'
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </td>
                                <td className='p-4 flex space-x-2'>
                                    <Link to={`/products/edit/${product._id}`} className='text-green-500 hover:text-green-600'>
                                        <FaRegEdit size={20} />
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteClick(product._id)}
                                        className='text-red-500 hover:text-red-600'
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                showModal={showModal}
                closeModal={closeModal}
                confirmDelete={confirmDelete}
            />
        </div>
    );
};

export default ProductStockTable;
