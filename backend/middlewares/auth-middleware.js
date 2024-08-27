const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    try {
        //verfiy the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //get user from the token
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
})

const adminOnly = asyncHandler(async (req, res, next) => {

    //check if user is admin
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not Authorized as an admin');
    }
})

module.exports = { authMiddleware, adminOnly };