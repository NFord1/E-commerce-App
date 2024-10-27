import React, { useState } from "react";


const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

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
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                // Registration successful, redirect or auto-login
                console.log('Registration successful:', data);
                // Redirect to another page e.g. products
            } else {
                console.error('Registration failed:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                     type="text"
                     id="username"
                     name="username"
                     value={formData.username}
                     onChange={handleChange}
                     required
                     />
                </div>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;