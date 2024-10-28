import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import fetchWithAuth from "../utils/fetchWithAuth";

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                    credentials: 'include'
                });
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        try {
            const response = await fetchWithAuth('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({productId: id, quantity: 1}),
            });

            if (response && response.ok) {
                alert('Product added to cart!');
            } else {
                console.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="product-details">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;