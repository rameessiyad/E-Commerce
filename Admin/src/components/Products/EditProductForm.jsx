import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BaseURL } from '../../api';
import { FaPlus, FaTrashAlt, FaUpload } from 'react-icons/fa'; // Import icons
import { toast } from 'react-hot-toast'
import DeleteModal from '../Modal/DeleModal';

const EditProductForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        colors: [], 
        images: []
    });

    const [newImages, setNewImages] = useState([]); 

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${BaseURL}/product/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                
                setProduct({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    category: data.category.name,
                    colors: data.colors || [],
                    images: data.images || []
                });
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    // Handle color input changes
    const handleColorChange = (index, value) => {
        const newColors = [...product.colors];
        newColors[index] = value;
        setProduct({
            ...product,
            colors: newColors
        });
    };

    // Add a new color input
    const handleAddColor = () => {
        setProduct({
            ...product,
            colors: [...product.colors, '']
        });
    };

    // Remove a color input
    const handleRemoveColor = (index) => {
        setProduct({
            ...product,
            colors: product.colors.filter((_, i) => i !== index)
        });
    };

    // Handle new image files
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if(files.length + product.images.length > 4) {
            toast.error('You can only upload up to 4 images');
            return;
        }
        setNewImages([...newImages, ...files]); 
    };

    // Handle removing an image
    const handleRemoveImage = (index) => {
        setProduct({
            ...product,
            images: product.images.filter((_, i) => i !== index)
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('description', product.description);
            formData.append('price', product.price);
            formData.append('stock', product.stock);
            formData.append('category', product.category);

            // Append selected colors as comma-separated string
            formData.append('colors', product.colors.join(','));

            // Append existing and new image files to FormData
            product.images.forEach((image) => {
                if (typeof image === 'string') {
                    formData.append('existingImages', image); // Send existing image URLs separately
                }
            });
            newImages.forEach((image) => {
                formData.append('images', image);
            });

            await fetch(`${BaseURL}/product/${id}`, {
                method: 'PUT',
                body: formData,
                credentials: 'include'
            });

            toast.success('Product Updated')
            navigate('/products');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const getImageSrc = (image) => {
        if (typeof image === 'string') {
            return image; // URL string
        }
        if (image instanceof File) {
            return URL.createObjectURL(image); // File object
        }
        return ''; // Default fallback

    };


    //delete product
    const handleDeleteProduct = async () => {
        try {
            await fetch(`${BaseURL}/product/${id}`, {
                method: 'DElETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            toast.success('Product deleted');
            navigate('/products');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='w-full bg-white py-10 rounded-lg flex flex-col lg:flex-row items-start justify-between p-6 lg:p-10 shadow-lg mt-10 gap-20'>
            {/* Images section */}
            <div className='grid grid-cols-2 gap-6 mb-8 lg:mb-0'>
                {product.images.length > 0 ? (
                    product.images.map((image, index) => (
                        <div key={index} className="bg-slate-100 p-4 rounded-lg relative">
                            <img
                                src={getImageSrc(image)}
                                alt={`product-${index}`}
                                className='w-20 h-20 lg:w-48 lg:h-48 object-contain'
                            />
                            <button
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => handleRemoveImage(index)}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No images available</p>
                )}
                {/* Add Image Icon */}
                <label htmlFor="image-upload" className="bg-slate-100 p-4 rounded-lg flex items-center justify-center cursor-pointer">
                    <FaUpload className="text-blue-600 text-3xl" />
                    <input
                        id="image-upload"
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </label>
            </div>

            {/* Details section */}
            <div className='flex flex-col gap-6 w-full lg:w-2/3'>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="text-2xl lg:text-3xl font-semibold text-black outline-none border-b border-gray-300 w-full py-2"
                        />
                    </div>
                    <div>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="text-sm lg:text-base text-gray-600 outline-none border-b border-gray-300 w-full py-2"
                            rows="3"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="text-xl lg:text-2xl text-black outline-none border-b font-semibold border-gray-300 w-full py-2"
                        />
                    </div>
                    <div>
                        <p className="text-base text-gray-500 mb-2">Choose Colors</p>
                        {product.colors.map((color, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) => handleColorChange(index, e.target.value)}
                                    className="border-b border-gray-300 py-2 w-full outline-none text-gray-600"
                                    placeholder="Enter color"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveColor(index)}
                                    className="ml-2 text-red-600"
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddColor}
                            className="flex items-center text-blue-600 mt-2"
                        >
                            <FaPlus className="mr-1" /> Add Color
                        </button>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className='flex items-center gap-3 w-full'>
                            <p className="capitalize text-gray-500 w-1/4">Stock</p>
                            <input
                                type="text"
                                name="stock"
                                value={product.stock}
                                onChange={handleChange}
                                className='outline-none border-b border-gray-300 w-full py-2 text-gray-600'
                            />
                        </div>
                        <div className='flex items-center gap-3 w-full'>
                            <p className="capitalize text-gray-500 w-1/4">Category</p>
                            <input
                                type="text"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                className='outline-none border-b border-gray-300 w-full py-2 text-gray-600'
                            />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <DeleteModal handleDeleteProduct={handleDeleteProduct} />
                    </div>
                    <div className='w-full flex'>
                        <button
                            type="submit"
                            className='bg-primary w-[70%] p-4 text-lg font-medium shadow-lg rounded-3xl text-white'
                        >
                            Save Changes
                        </button>
                        <Link to='/products' className='bg-white w-[30%] text-primary shadow-black shadow-sm font-medium rounded-3xl p-4 ml-4 text-center text-xl'>Cancel</Link>
                    </div>

                </form>

            </div>
        </div>

    );
};

export default EditProductForm;
