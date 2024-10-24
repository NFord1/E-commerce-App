const pool = require('../config/db');

// Checkout and create an order
const checkoutCart = async (req, res) => {
    const { userId } = req.params;

    try {
        // Get the user's cart
        const cart = await pool.query('SELECT p.id, p.price, ci.quantity FROM products p JOIN cart_items ci ON p.id = ci.product_id JOIN carts c ON ci.cart_id = c.id WHERE c.user_id = $1', [userId]);

        if (cart.rows.length === 0) {
            return res.status(400).json({message: 'No items in the cart'});
        }

        // Calculate the total price of the order
        const totalPrice = cart.rows.reduce((total, item) => total + item.price * item.quantity, 0);

        // Create the order
        const newOrder = await pool.query('INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *', [userId, totalPrice]);

        const orderId = newOrder.rows[0].id;

        // Add items to the order_items table
        for (const item of cart.rows) {
            await pool.query('INSERT INTO order_items (order_id, product_id, quantity, price_at_time_of_order) VALUES ($1, $2, $3, $4)', [orderId, item.id, item.quantity, item.price]);
        }

        // Clear the user's cart
        await pool.query('DELETE FROM cart_items WHERE cart_id = (SELECT id FROM carts WHERE user_id = $1)', [userId]);

        // Return the order details
        res.status(201).json({
            message: 'Order placed successfully',
            orderId: newOrder.rows[0].id, 
            total_price: newOrder.rows[0].total_price,
            order_date: newOrder.rows[0].order_date,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { checkoutCart };