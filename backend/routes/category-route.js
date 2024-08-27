const { getCategories } = require('../controllers/category-controller');

const express = require('express');
const router = express.Router();

router.get('/', getCategories);

module.exports = router;