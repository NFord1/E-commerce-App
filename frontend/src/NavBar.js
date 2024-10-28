import React from "react";

const NavBar = ({ onLogout }) => {
    return (
        <nav>
            <h1>Ecommerce Website Project</h1>
            <button onClick={onLogout}>Logout</button>
        </nav>
    );
};

export default NavBar;