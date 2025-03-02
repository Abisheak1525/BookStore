import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../LoginModule/Login';
import Signup from '../LoginModule/Signup';
import Landing from '../Landing/Landing';
import Categories from '../Categories/Categories';
import Bookdetail from '../BookDetails/Bookdetail';
import UserCartComponent from '../components/UserCartComponent';
import Dashboard from '../AdminModule/Dashboard';
import WhyUs from '../WhyUsComp/WhyUs';
import OrderDetails from '../AdminModule/OrderDetails';
import { CartProvider } from '../CartModule/CartContext';
import ProfilePage from '../UserProfile/ProfilePage';
import CheckoutComponent from '../Checkout/CheckoutComponent';
import Auction from '../AuctionModule/Auction';
import UserTable from '../AdminUser/UserTable';
import BookDetail from '../AdminBook/BookDetail';

const Routeopp = () => {
  return (
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path='/categories' element={<Categories/>} />
            <Route path="/book/:id" element={<Bookdetail />} />
            <Route path='/cart' element={<UserCartComponent />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/why-us' element={<WhyUs />} />
            <Route path='/order-details' element={<OrderDetails />} />
            <Route path='/profile/*' element={<ProfilePage />} />
            <Route path='/checkout' element={<CheckoutComponent />} />
            <Route path="/auction/:id" element={<Auction />} />
            <Route path="/user-management" element={<UserTable />} />
            <Route path='/book-details' element={<BookDetail />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
  );
};

export default Routeopp;