import './App.css';

import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import NavBar from './NavBar';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import OrderHistoryPage from './components/OrderHistoryPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('REMOVED_API_KEY');

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status on initial load
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/status', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        //setIsLoggedIn(response.ok); // If response is OK, user is logged in
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);


  const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/logout', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            console.log('Logout successful');
            setIsLoggedIn(false);
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
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className='App'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage onLogin={() => setIsLoggedIn(true)}/>} />
            <Route path='/products/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/orders/history' element={<OrderHistoryPage />} />
          </Routes>
        </div>
      </Router>
    </Elements>
  );
}

export default App;
