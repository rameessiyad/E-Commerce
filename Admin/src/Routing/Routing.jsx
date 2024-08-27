import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DashBoard from '../pages/DashBoard/DashBoard'
import Navbar from '../components/Navbar/Navbar'
import Products from '../pages/Products/Products'
import OrderList from '../pages/OrderList/OrderList'
import ProductsStock from '../pages/ProductsStock/ProductsStock'
import AddProduct from '../pages/Products/AddProduct'
import EditProduct from '../pages/Products/EditProduct'
import Login from '../pages/Login/Login'

const Routing = () => {
    const location = useLocation();
    return (
        <div>
            {location.pathname !== '/login' && <Navbar />}
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<DashBoard />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/add' element={<AddProduct />} />
                <Route path='/products/edit/:id' element={<EditProduct />} />
                <Route path='/order-lists' element={<OrderList />} />
                <Route path='/products-stock' element={<ProductsStock />} />
            </Routes>
        </div>
    )
}

export default Routing