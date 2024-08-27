const Category = require('../models/category-model');
const asyncHandler = require('express-async-handler');

//get categories
module.exports = {
    getCategories: asyncHandler(async (req, res) => {
        const categories = await Category.find({});
        res.json({ "All categories": categories });
    })
}