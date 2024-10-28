import React, {useEffect, useState} from "react";
import Product from "./Product";



const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products', {
                    credentials: 'include',
                });
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();

    }, []);

    return (
        <div className="product-list">
            <h1>Products</h1>
            <div className="products-container">
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;