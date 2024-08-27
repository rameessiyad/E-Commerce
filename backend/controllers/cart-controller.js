const Cart = require('../models/cart-model');
const asyncHandler = require('express-async-handler');
const Product = require('../models/product-model');

module.exports = {
    getCart: asyncHandler(async (req, res) => {
        const user = req.user;

        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }

        //find cart by user
        const cart = await Cart.findOne({ user: user._id }).populate('items.product', 'name price images');
        if (!cart) {
            res.status(401);
            throw new Error('Cart not found');
        }

        res.status(200).json(cart);

    }),


    addToCart: asyncHandler(async (req, res) => {
        const user = req.user;
        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }

        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            res.status(400);
            throw new Error('Product ID and quantity are required');
        }

        //find product in the database
        const product = await Product.findById(productId);

        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        // Calculate total price based on quantity
        const totalPrice = product.price * quantity;

        //find the user cart
        let cart = await Cart.findOne({ user: user._id });

        if (!cart) {
            //create a new cart
            cart = new Cart({ user: user._id, items: [] });
        }

        // check if the product already exists in the cart
        let itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

        if (itemIndex > -1) {
            //update the quantity and total price
            const existingItem = cart.items[itemIndex];
            const previousTotalPrice = existingItem.price;
            existingItem.quantity += quantity;
            existingItem.price = existingItem.quantity * product.price;

            //update the total price
            cart.total += existingItem.price - previousTotalPrice;

        } else {
            //insert new item
            cart.items.push({
                product: productId,
                quantity,
                price: totalPrice,
            });

            //update the total field in the cart
            cart.total += totalPrice;
        }

        //save cart 
        const updatedCart = await cart.save();

        res.status(200).json({ message: 'Product added to cart', cart: updatedCart });
    }),

    removeFromCart: asyncHandler(async (req, res) => {
        const user = req.user;

        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }

        const { id } = req.params;

        // Find the user's cart
        let cart = await Cart.findOne({ user: user._id });
        if (!cart) {
            res.status(400);
            throw new Error('Cart not found');
        }

        // Find the item to be removed
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === id);

        if (itemIndex > -1) {
            const itemToRemove = cart.items[itemIndex];

            if (itemToRemove.quantity > 1) {
                // Decrease the quantity
                itemToRemove.quantity -= 1;

                // Update the price for the item based on the new quantity
                const unitPrice = itemToRemove.price / (itemToRemove.quantity + 1);
                itemToRemove.price = unitPrice * itemToRemove.quantity;

                // Update the total price of the cart
                cart.total -= unitPrice;

            } else {
                // Remove the item
                cart.total -= itemToRemove.price; // Update the cart total
                cart.items.splice(itemIndex, 1);
            }

            // Save cart
            const updatedCart = await cart.save();
            res.status(200).json({ message: 'Product removed from cart', cart: updatedCart });
        } else {
            res.status(400);
            throw new Error('Item not found in cart');
        }
    })

}