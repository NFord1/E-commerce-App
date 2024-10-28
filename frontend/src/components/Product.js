import React from "react";

const Product = ({ product }) => {
    return (
        <div className="product">
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <p>{product.description}</p>
        </div>
    );
};

export default Product;