const pool = require('../config/db');

const getAllOrdersByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY order_date DESC', [userId]);

        if (orders.rows.length === 0) {
            return res.status(404).json({message: 'No orders found for this user'});
        }

        res.status(200).json(orders.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Get the order details
        const order = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);

        if (order.rows.length === 0) {
            return res.status(404).json({message: 'Order not found'});
        }

        const orderItems = await pool.query('SELECT p.name, p.description, oi.quantity, oi.price_at_time_of_order FROM products p JOIN order_items oi ON p.id = oi.product_id WHERE oi.order_id = $1', [orderId]);

        res.status(200).json({
            order: order.rows[0],
            products: orderItems.rows,
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllOrdersByUser,
    getOrderById
};