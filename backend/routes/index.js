const express = require('express');
const router = express.Router();

const authRoute = require('./auth-route')
const productRoute = require('./product-route')
const categoryRoute = require('./category-route')
const cartRoute = require('./cart-route')
const orderRoute = require('./order-route')
const adminRoute = require('./admin-route')

//end points
router.use('/auth', authRoute);
router.use('/product', productRoute);
router.use('/categories', categoryRoute);
router.use('/cart', cartRoute);
router.use('/order', orderRoute);
router.use('/admin', adminRoute);

module.exports = router;
