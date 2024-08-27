const express = require('express');
const { getProducts, addProduct, editProduct, deleteProduct, getProductById, getlatest15Products, getProductsByCategory } = require('../controllers/product-controller');
const { authMiddleware, adminOnly } = require('../middlewares/auth-middleware');
const { upload } = require('../utils/image-upload');

const router = express.Router();

router.get('/', getProducts);
router.get('/latest', getlatest15Products);
router.get('/category/:categoryName', getProductsByCategory);
router.get('/:id', getProductById);

router.post('/', authMiddleware, adminOnly, upload.array('images', 6), addProduct);
router.put('/:id', authMiddleware, adminOnly, upload.array('images', 6), editProduct);
router.delete('/:id', authMiddleware, adminOnly, deleteProduct);

module.exports = router;
