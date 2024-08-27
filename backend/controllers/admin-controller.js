const User = require('../models/user-model');
const Product = require('../models/product-model');
const Order = require('../models/order-model');

const asyncHandler = require('express-async-handler')

module.exports = {
    getDashboardCounts: asyncHandler(async (req, res) => {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        res.status(200).json({
            totalUsers,
            totalProducts,
            totalOrders
        })
    })
}