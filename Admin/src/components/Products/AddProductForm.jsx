import React, { useEffect, useRef, useState } from 'react';
import { RiImageAddFill } from "react-icons/ri";
import { AiFillPlusCircle } from "react-icons/ai";
import toast from 'react-hot-toast';
import { BaseURL } from '../../api';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
    const imageRef = useRef(null);
    const [images, setImages] = useState([]);
    const [colors, setColors] = useState(['Red']);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Grooming',
        stock: '',
        colors: [], // Ensure colors is included here
    });

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        if (selectedImages.length + images.length > 4) {
            toast.error('You can only upload up to 4 images.');
            return;
        }
        setImages((prevImages) => [...prevImages, ...selectedImages]);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleColorChange = (e, index) => {
        const newColors = [...colors];
        newColors[index] = e.target.value;
        setColors(newColors);
    };

    const addColorInput = () => {
        setColors([...colors, '']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update formData with current colors state
        const updatedFormData = { ...formData, colors };

        const data = new FormData();
        images.forEach((image) => {
            data.append('images', image);
        });
        data.append('name', updatedFormData.name);
        data.append('description', updatedFormData.description);
        data.append('price', updatedFormData.price);
        data.append('category', updatedFormData.category);
        data.append('colors', JSON.stringify(updatedFormData.colors));
        data.append('stock', updatedFormData.stock);

        try {
            const response = await fetch(`${BaseURL}/product`, {
                method: 'POST',
                body: data,
                credentials: 'include',
            });

            if (response.ok) {
                toast.success('Product added successfully!');
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Grooming',
                    stock: '',
                    colors: [] // Reset colors
                });
                setImages([]);
                setColors(['Red']); // Reset colors
                navigate('/products');
            } else {
                toast.error('Failed to add product.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Failed to add product.');
        }
    };

    useEffect(() => {
        // Synchronize formData colors with colors state
        setFormData((prevFormData) => ({ ...prevFormData, colors }));
    }, [colors]);

    return (
        <div className='w-full bg-white p-5 mt-10 flex flex-col lg:flex-row items-center rounded-lg py-10 justify-evenly'>
            <div className='mb-5 lg:mb-0'>
                <RiImageAddFill size={100} onClick={() => imageRef.current.click()} className='cursor-pointer' />
            </div>

            <div className='w-full lg:w-3/5'>
                <form className='flex flex-col items-start gap-6' onSubmit={handleSubmit}>
                    <input
                        type="file"
                        className='hidden'
                        ref={imageRef}
                        multiple
                        onChange={handleImageChange}
                        name='productImages'
                    />

                    {/* Image Previews */}
                    <div className='flex gap-3 flex-wrap'>
                        {images.map((image, index) => (
                            <div key={index} className='w-20 h-20'>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    className='object-cover w-full h-full rounded-lg'
                                />
                            </div>
                        ))}
                    </div>

                    {/* Product Title */}
                    <div className='w-full'>
                        <h1 className="text-xl lg:text-2xl font-medium capitalize">Add Product Title</h1>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="outline-none w-full border-b border-slate-300 py-2"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className='w-full'>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder='Add description'
                            className="outline-none w-full border-b border-slate-300 py-2"
                        />
                    </div>

                    {/* Price and Category */}
                    <div className='w-full flex flex-col lg:flex-row gap-6'>
                        <div className='w-full lg:w-1/2'>
                            <h1 className="text-xl lg:text-2xl font-medium capitalize flex gap-2 items-center">
                                <AiFillPlusCircle size={24} /> <span>Add Price</span>
                            </h1>
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="outline-none w-full border-b border-slate-300 py-2"
                                required
                            />
                        </div>
                        <div className='w-full lg:w-1/2'>
                            <h1 className="text-xl lg:text-2xl font-medium capitalize flex gap-2 items-center">
                                <AiFillPlusCircle size={24} /> <span>Add Category</span>
                            </h1>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full border-b border-slate-300 py-2 outline-none"
                            >
                                <option value="Grooming">Grooming</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Footwear">Footwear</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                    </div>

                    {/* Colors and Stock */}
                    <div className='w-full flex flex-col lg:flex-row gap-6'>
                        <div className='w-full lg:w-1/2'>
                            <h1 className="text-base text-gray-500 mb-2">Add Colors</h1>
                            {colors.map((color, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={color}
                                        onChange={(e) => handleColorChange(e, index)}
                                        className="outline-none w-full border-b border-slate-300 py-2"
                                        required
                                    />
                                    {index === colors.length - 1 && (
                                        <AiFillPlusCircle size={24} className="cursor-pointer" onClick={addColorInput} />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className='w-full lg:w-1/2'>
                            <h1 className="text-base text-gray-500 mb-2">Add Stock</h1>
                            <input
                                type="text"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                placeholder='Enter stock quantity'
                                className="outline-none w-full border-b border-slate-300 py-2"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-primary p-3 text-lg shadow-md text-white rounded-xl w-full lg:w-auto px-6 mt-4 lg:mt-0"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProductForm;
