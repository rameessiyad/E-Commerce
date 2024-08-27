const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    images: [{
        type: String,
        requried: true,
    }],
    colors: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;