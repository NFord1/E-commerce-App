import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    return (
        <div className="product">
            <Link to={`/products/${product.id}`}>
                <h2>{product.name}</h2>
            </Link>
            <p>{product.price}</p>
            <p>{product.description}</p>
        </div>
    );
};

export default Product;