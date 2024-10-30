const pool = require('../config/db');

const getAllOrdersByUser = async (req, res) => {
    const  userId  = req.user.id;

    try {
        //const orders = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY order_date DESC', [userId]);
        const orders = await pool.query(`SELECT o.id AS order_id, o.total_price, o.order_date, oi.product_id, oi.quantity, oi.price_at_time_of_order, p.name AS product_name FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id WHERE o.user_id = $1 ORDER BY o.order_date DESC`, [userId]);

        if (orders.rows.length === 0) {
            return res.status(404).json({message: 'No orders found for this user'});
        }
        //New section

        // Structure orders by order ID
        const orderHistory = orders.rows.reduce((acc, row) => {
            const { order_id, total_price, order_date, product_id, quantity, price_at_time_of_order, product_name } = row;

            // If the order doesn't exist in the accumulator, add it
            if (!acc[order_id]) {
                acc[order_id] = {
                    orderId: order_id,
                    totalPrice: total_price,
                    orderDate: order_date,
                    items: []
                };
            }

            // Add item details to the order's items list
            acc[order_id].items.push({
                productId: product_id,
                productName: product_name,
                quantity: quantity,
                priceAtOrder: price_at_time_of_order
            });

            return acc;
        }, {});

        // Convert object to array for better display compatibility in frontend
        res.status(200).json(Object.values(orderHistory)); 

        //res.status(200).json(orders.rows);
    } catch (err) {
        console.error('Error fetching order history:', err.message);
        res.status(500).send({error: 'Failed to fetch order history'});
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