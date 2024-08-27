const Product = require('../models/product-model');
const Category = require('../models/category-model');
const asyncHandler = require('express-async-handler');
const path = require('path');
const { createCategory } = require('../utils/generate-categoryId');
const { upload, getFileUrl } = require('../utils/image-upload');

module.exports = {
    getProducts: asyncHandler(async (req, res) => {
        const products = await Product.find({}).sort({ createdAt: -1 });

        if (!products) {
            res.status(400);
            throw new Error('No products found');
        }
        res.json({ "All products": products });
    }),

    getlatest15Products: asyncHandler(async (req, res) => {
        const products = await Product.find({})
        .sort({createdAt: -1})
        .limit(10);
        if (!products) {
            res.status(400);
            throw new Error('No products found');
        }
        res.json({ "All products": products });
    }),

    getProductById: asyncHandler(async (req, res) => {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            res.status(400);
            throw new Error('Product not found');
        }
        res.json(product);
    }),

    getProductsByCategory: asyncHandler(async (req, res) => {
        const { categoryName } = req.params;

        const products = await Product.find({ 'category.name': categoryName });

        if (!products.length) {
            res.status(400);
            throw new Error('No products found');
        }

        res.status(200).json(products);
    }),


    //admin product controllers

    addProduct: asyncHandler(async (req, res) => {
        const { name, description, price, category: categoryName, stock, colors } = req.body;
        const files = req.files;

        if (!name || !description || !price || !categoryName || !stock) {
            res.status(400);
            throw new Error('Please provide all required fields');
        }

        // Convert colors from string back to array if it was stringified in the frontend
        let colorsArray;
        try {
            colorsArray = JSON.parse(colors);
        } catch (error) {
            colorsArray = Array.isArray(colors) ? colors : []; // Ensure it's an array
        }

        console.log('Parsed Colors Array:', colorsArray);

        //hanlde image urls
        const imageUrls = files.map(file => getFileUrl(req, file));

        // Check if the category exists or create a new one
        const category = await createCategory(categoryName);

        // Create product
        const product = await Product.create({
            name,
            description,
            price,
            category: { id: category._id, name: category.name }, // Store both ID and name
            stock,
            images: imageUrls,
            colors: colorsArray
        });

        // Update the category's product list
        category.products.push(product._id);
        await category.save();

        res.status(201).json({ message: "Product created", product });
    }),



    editProduct: asyncHandler(async (req, res) => {
        const { id } = req.params;

        // Check if the product exists
        let product = await Product.findById(id);
        if (!product) {
            res.status(400);
            throw new Error('Product not found');
        }

        // Update product details
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.stock = req.body.stock || product.stock;

        // Handle colors
        if (req.body.colors) {
            product.colors = Array.isArray(req.body.colors)
                ? req.body.colors
                : req.body.colors.split(',');
        }

        // Handle category
        if (req.body.category) {
            let category = await createCategory(req.body.category);
            product.category = { id: category._id, name: category.name };
        }

        // Handle removal of images
        if(req.body.existingImages) {
            const existingImgages = Array.isArray(req.body.existingImages)
            ? req.body.existingImages
            : [req.body.existingImages];

            product.images = product.images.filter(image => existingImgages.includes(image));
        }else {
            product.images = [];
        }

        // Handle new images if provided
        if (req.files && req.files.length > 0) {
            // Generate URLs for new images
            const newImages = req.files.map(file => getFileUrl(req, file));
            product.images = [...product.images, ...newImages];
        }

        // Save updated product
        const updatedProduct = await product.save();
        res.status(200).json({ message: "Product updated", product: updatedProduct });
    }),


    deleteProduct: asyncHandler(async (req, res) => {
        const { id } = req.params;

        // Check if the product exists
        let product = await Product.findById(id);
        if (!product) {
            res.status(400);
            throw new Error('Product not found');
        }

        // Ensure the product's category is a valid string ID
        const categoryId = product.category.toString();

        // Remove the product from the category list
        await Category.updateOne(
            { _id: categoryId },
            { $pull: { products: product._id } }
        );

        // Delete the product
        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: "Product deleted" });
    })
}