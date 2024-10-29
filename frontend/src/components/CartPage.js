import React, {useEffect, useState} from "react";
import fetchWithAuth from "../utils/fetchWithAuth";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetchWithAuth('http://localhost:5000/api/cart');
                const items = await response.json();
                setCartItems(items);
                calculateTotal(items);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();

    }, []);

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const updateQuantity = async (productId, adjustment) => {
        try {
            const response = await fetchWithAuth(`http://localhost:5000/api/cart/${productId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adjustment }), // Send +1 or -1
            });
    
            if (response && response.ok) {
                const updatedItem = await response.json();
    
                if (updatedItem.message === 'Product removed from cart') {
                    // Remove item from cartItems if it was removed on the backend
                    const updatedItems = cartItems.filter(item => item.id !== productId);
                    setCartItems(updatedItems);
                } else {
                    // Update quantity for the item
                    const updatedItems = cartItems.map(item =>
                        item.id === productId ? { ...item, quantity: updatedItem.quantity } : item
                    );
                    setCartItems(updatedItems);
                }
    
                calculateTotal(cartItems);
            } else {
                console.error('Failed to update cart item quantity');
            }
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    const removeItem = async (productId) => {
        try {
            await fetchWithAuth(`http://localhost:5000/api/cart/${productId}`, {
                method: 'DELETE'
            });
            const updatedItems = cartItems.filter(item => item.id !== productId);
            setCartItems(updatedItems);
            calculateTotal(updatedItems);

        } catch (error) {

            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                        <p>{item.name}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => updateQuantity(item.id, + 1)}>+</button>
                        <button onClick={() => updateQuantity(item.id, - 1)}>-</button>
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                ))}
            </div>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
        </div>
    );
    
};

export default CartPage;