import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css';


const NavBar = ({ isLoggedIn, onLogout }) => {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Ecommerce Website Project</h1>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/products" className="nav-link">Products</Link>
                <Link to="/cart" className="nav-link">Cart</Link>
                {isLoggedIn ? (
                    <button onClick={onLogout} className="nav-button">Logout</button>
                ) : (
                    <Link to="/login" className="nav-link">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;