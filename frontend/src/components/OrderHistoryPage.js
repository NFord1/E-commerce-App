import React, {useEffect, useState} from "react";
import fetchWithAuth from "../utils/fetchWithAuth";

const OrderHistoryPage = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await fetchWithAuth('http://localhost:5000/api/orders/history');
                if (response.ok) {
                    const orders = await response.json();
                    setOrderHistory(orders);
                } else {
                    console.error('failed to fetch order history');
                }
            } catch (error) {
                console.error('Error fetching order history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    if (loading) {
        return <p>Loading order history...</p>;
    }

    return (
        <div className="order-history-page">
            <h1>Order History</h1>
            {orderHistory.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orderHistory.map(order => (
                    <div key={order.orderId} className="order">
                        <h2>Order ID: {order.orderId}</h2>
                        <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        <p>Total Price: ${order.totalPrice}</p>
                        <h3>Items:</h3>
                        <ul>
                            {order.items.map(item => (
                                <li key={item.productId}>
                                    {item.productName} - Quantity: {item.quantity} - Price at Order: ${item.priceAtOrder}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistoryPage;