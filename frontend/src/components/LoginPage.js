import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form susmission (API call will go here)
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                // Registration successful, redirect or auto-login
                console.log('Login successful:', data);
                navigate('/products');
                // Redirect to another page e.g. products
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleGoogleLogin = () => {
        // Redirect user to google login endpoint on backend
        window.location.href = 'http://localhost:5000/api/auth/google';
    };

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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                     type="email"
                     id="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                     />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                     type="password"
                     id="password"
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     required
                     />
                </div>
                <button type="submit">Login</button>
            </form>

            <div>
                <p>Or login with:</p>
                <button onClick={handleGoogleLogin} >Login with Google</button>
                <button>Login with Facebook</button>
            </div>

            <p>
                Don't have an account? <a href="/register">Register here</a>
            </p>

            <div>
                <button onClick={handleLogout} >Logout</button>
            </div>
        </div>
    );
};

export default LoginPage;