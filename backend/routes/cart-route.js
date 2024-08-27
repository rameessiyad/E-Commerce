const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cart-controller');
const { authMiddleware } = require('../middlewares/auth-middleware');
const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.delete('/:id', authMiddleware, removeFromCart)

module.exports = router;