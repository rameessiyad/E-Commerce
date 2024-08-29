const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const apiRoute = require('./routes')
const { notFound, errorHandler } = require('./middlewares/error-middleware');

const app = express();

// Allowed origins
const allowedOrigins = [
    'http://localhost:5000',
    'https://e-commerce-chi-ochre.vercel.app',
    'https://mens-cart-admin.vercel.app',
    'http://localhost:4000'
];

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));

app.use(morgan('dev'));
app.use(cookieParser());

//route
app.use('/api/v1', apiRoute);

//error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
})