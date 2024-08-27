const express = require('express');
const { authMiddleware, adminOnly } = require('../middlewares/auth-middleware');
const { getDashboardCounts } = require('../controllers/admin-controller');
const router = express.Router();

router.get('/dashboard-counts', authMiddleware, adminOnly, getDashboardCounts);

module.exports = router;