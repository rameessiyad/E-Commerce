const Category = require('../models/category-model');
const asyncHandler = require('express-async-handler');

// generate a new category ID
const generateCategoryId = async () => {
    try {
        const lastCategory = await Category.findOne().sort({ _id: -1 }).exec();
        let newId = 1000; 
        if (lastCategory) {
            const lastId = parseInt(lastCategory._id, 10);
            if (!isNaN(lastId)) {
                newId = lastId + 1;
            }
        }
        return newId.toString();
    } catch (error) {
        console.error('Error generating category ID:', error);
        throw error;
    }
};

// Function to create a new category
const createCategory = asyncHandler(async (name) => {
    let category = await Category.findOne({ name });

    if (category) {
        return category; // Return existing category
    }

    const categoryId = await generateCategoryId();
    const newCategory = new Category({
        _id: categoryId,
        name
    });
    await newCategory.save();

    return newCategory;
});

module.exports = {
    createCategory
};