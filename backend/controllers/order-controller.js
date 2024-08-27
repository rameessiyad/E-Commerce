const Order = require('../models/order-model');
const Cart = require('../models/cart-model');
const asyncHandler = require('express-async-handler');

module.exports = {
    createOrder: asyncHandler(async (req, res) => {
        const user = req.user;
        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }

        //find cart
        const cart = await Cart.findOne({ user: user._id }).populate('items.product');

        if (!cart) {
            res.status(401);
            throw new Error('Cart not found');
        }

        //take product image

        // Extract shipping address fields
        const { streetAddress, town, state, pinCode } = req.body.shippingAddress || {};

        //create new order with cart items
        const order = new Order({
            user: user._id,
            items: cart.items.map((item) => {
                const productImage = item.product?.images?.[0] || ''; // Safely access product image
                return {
                    product: item.product._id,
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: productImage // Add image to the order item
                };
            }),
            total: cart.total,
            shippingAddress: {
                streetAddress,
                town,
                state,
                pinCode
            }
        });

        //save the order
        const createdOrder = await order.save();

        //clear the cart
        cart.items = [];
        cart.total = 0;
        await cart.save();

        res.status(200).json({ message: 'Order created', order: createdOrder });
    }),

    myOrders: asyncHandler(async (req, res) => {
        const user = req.user;
        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }

        const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });
        if (!orders) {
            res.status(401);
            throw new Error('No orders found');
        }
        res.status(200).json({ orders: orders });
    }),

    //view orders by admin
    getOrders: asyncHandler(async (req, res) => {
        const orders = await Order.find({}).populate('user', 'username',).sort({ createdAt: -1 });
        res.status(200).json({ orders: orders });

        if (!orders) {
            res.status(400);
            throw new Error('No orders found');
        }
    }),

    // get latest 3 orders
    getLatestThreeOrders: asyncHandler(async (req, res) => {
        const orders = await Order.find({}).populate('user', 'username',)
            .sort({ createdAt: -1 })
            .limit(3);
        res.status(200).json({ orders: orders });
    }),


    //update order by admin
    updateOrder: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        //find the order 
        const order = await Order.findById(id);
        if (!order) {
            res.status(400);
            throw new Error('Order not found');
        }

        //update the order
        order.status = status;
        const updatedOrder = await order.save();
        res.status(200).json({ message: 'Order updated', order: updatedOrder });
    })
}