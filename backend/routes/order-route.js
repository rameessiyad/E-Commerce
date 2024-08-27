const express = require('express');
const { authMiddleware, adminOnly } = require('../middlewares/auth-middleware');
const { createOrder, myOrders, getOrders, updateOrder, getLatestThreeOrders } = require('../controllers/order-controller');
const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/my-orders', authMiddleware, myOrders);

//admin routes
router.get('/all', authMiddleware, adminOnly, getOrders);
router.get('/latest', authMiddleware, adminOnly, getLatestThreeOrders);
router.put('/:id', authMiddleware, adminOnly, updateOrder);

module.exports = router;