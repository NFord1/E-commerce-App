const pool = require('../config/db');

const addToCart = async (req, res) => {
    //const { userId } = req.params;
    const { productId, quantity=1 } = req.body;

    try {
        // Get user ID from the session
        const userId = req.user.id;

        // Check if cart exists
        const cart = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);

        if (cart.rows.length === 0) {
            return res.status(404).json({message: 'Cart not found'});
        }

        const cartId = cart.rows[0].id;

        //Check if the product is already in the cart
        const exisitingItem = await pool.query('SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cartId, productId]);

        if (exisitingItem.rows.length > 0) {
            // If the product is already in the cart, update the quantity
            const updatedItem = await pool.query('UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *', [quantity, cartId, productId]);
            return res.status(200).json(updatedItem.rows[0]);
        }

        // Otherwise, add the product to the cart
        const newItem = await pool.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [cartId, productId, quantity]);
        res.status(201).json(newItem.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

};

const getItemsFromCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await pool.query(
            'SELECT p.id, p.name, p.price, ci.quantity FROM products p JOIN cart_items ci ON p.id = ci.product_id JOIN carts c ON ci.cart_id = c.id WHERE c.user_id = $1', [userId]);
        
        if (cart.rows.length === 0) {
            return res.status(404).json({message: 'No items found in cart'});
        }
        res.status(200).json(cart.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
};

const removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        // Check if the cart exists
        const cart = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);

        if (cart.rows.length === 0) {
        return res.status(404).json({ message: 'Cart not found' });
        }

        const cartId = cart.rows[0].id;

        // Delete the product from the cart
        const deletedItem = await pool.query(
        'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *',
        [cartId, productId]
        );

        if (deletedItem.rows.length === 0) {
        return res.status(404).json({ message:  'Product not found in cart' });
        }

        res.status(200).json({ message: 'Product removed from cart' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    addToCart,
    getItemsFromCart,
    removeItemFromCart
};