const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generate-token');

module.exports = {
    register: asyncHandler(async (req, res) => {
        const { name, username, email, password } = req.body;

        // Check if user with same email or username already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        // Omit password from response
        const { password: pwd, ...userWithoutPassword } = user._doc;

        generateToken(res, user._id);

        res.status(201).json({
            message: "User created successfully",
            user: userWithoutPassword,
        });
    }),

    login: asyncHandler(async (req, res) => {
        const { usernameOrEmail, password } = req.body;

        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
        });

        if (!user) {
            res.status(400);
            throw new Error('User not found');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Omit password from response
            const { password: pwd, ...userWithoutPassword } = user._doc;

            generateToken(res, user._id);

            res.status(200).json({
                message: "User logged in successfully",
                user: userWithoutPassword
            });
        } else {
            res.status(400);
            throw new Error('Incorrect password');
        }
    }),

    logout: asyncHandler(async (req, res) => {
        res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: 'User logged out successfully' });
    })
}