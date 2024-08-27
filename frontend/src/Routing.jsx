import React, { useEffect } from 'react';
import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import SignupForm from './pages/SignupForm/SignupForm';

const LoginForm = lazy(() => import('./pages/LoginForm/LoginForm'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage/ShopPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage/CategoryPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage/CheckoutPage'));
const OrderCompletePage = lazy(() => import('./pages/OrderCompletePage/OrderCompletePage'));
const MyOrders = lazy(() => import('./pages/MyOrders/MyOrders'));

const Routing = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const userInfo = localStorage.getItem('userInfo');

    const hideNavAndFooterRoutes = ['/login', '/signup'];

    const shouldHideNavAndFooter = hideNavAndFooterRoutes.includes(location.pathname);

    useEffect(() => {
        if (location.pathname === '/cart' && !userInfo) {
            navigate('/login');
        }
    }, [location.pathname, navigate, userInfo]);

    return (
        <div>
            <Suspense fallback={<LoadingSpinner />}>
                {!shouldHideNavAndFooter && <Navbar />}
                <div className={shouldHideNavAndFooter ? null : 'mx-auto px-4 md:px-36'}>
                    <Routes>
                        <Route path='/login' element={<LoginForm />} />
                        <Route path='/signup' element={<SignupForm />} />
                        <Route path='/' element={<HomePage />} />
                        <Route path='/shop' element={<ShopPage />} />
                        <Route path='/all-products' element={<ProductsPage />} />
                        <Route path='/contact-us' element={<ContactPage />} />
                        <Route path='/product/:id' element={<ProductPage />} />
                        <Route path='/cart' element={<CartPage />} />
                        <Route path='/category/:categoryName' element={<CategoryPage />} />
                        <Route path='/checkout' element={<CheckoutPage />} />
                        <Route path='/order-complete' element={<OrderCompletePage />} />
                        <Route path='/my-orders' element={<MyOrders />} />
                    </Routes>
                </div>
                {!shouldHideNavAndFooter && <Footer />}
            </Suspense>
        </div>
    );
};

export default Routing;
