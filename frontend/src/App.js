import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import NavBar from './NavBar';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('REMOVED_API_KEY');

function App() {

  const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/logout', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            console.log('Logout successful');
            window.location.href = 'http://localhost:3000';
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
  };


  return (
    <Elements stripe={stripePromise}>
      <Router>
        <NavBar onLogout={handleLogout} />
        <div className='App'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/products/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </Elements>
  );
}

export default App;
