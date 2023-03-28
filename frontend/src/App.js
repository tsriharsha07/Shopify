import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect,useState } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders'


function App() {
  const [stripeApiKey,setStripeApiKey]=useState('')
  useEffect(() => {
    store.dispatch(loadUser())
    async function getStripeApiKey(){
      const {data}=await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeapikey)
    }
    getStripeApiKey();
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} exact />
            <Route path="/product/:id" element={<ProductDetails />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route path="/me" element={<ProtectedRoute isAdmin={false}><Profile /></ProtectedRoute>} exact />
            <Route path="/me/update" element={<ProtectedRoute isAdmin={false}><UpdateProfile /></ProtectedRoute>} exact />
            <Route path="/password/update" element={<ProtectedRoute isAdmin={false}><UpdatePassword /></ProtectedRoute>} exact />
            <Route path="/shipping" element={<ProtectedRoute isAdmin={false}><Shipping /></ProtectedRoute>} exact />
            <Route path="/order/confirm" element={<ProtectedRoute isAdmin={false}><ConfirmOrder /></ProtectedRoute>} exact />
            <Route path="/success" element={<ProtectedRoute isAdmin={false}><OrderSuccess /></ProtectedRoute>} exact />
            <Route path="/orders/me" element={<ProtectedRoute isAdmin={false}><ListOrders /></ProtectedRoute>} exact />
            <Route path="/password/forgot" element={<ForgotPassword/>} exact />
            <Route path="/cart" element={<Cart/>} exact/>
            <Route path="/password/reset/:token" element={<NewPassword/>} exact />
            {stripeApiKey && 
            
              <Route path="/payment" element={<ProtectedRoute isAdmin={false}>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment /></Elements></ProtectedRoute>} exact/>
              }
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
