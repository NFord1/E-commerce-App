const pool = require('../config/db');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM products');
        res.status(200).json(products.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
        if (product.rows.length === 0) {
            return res.status(404).json({message: 'Product not found'});
        }

        res.status(200).json(product.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Create a new product
const createProduct = async (req, res) => {
    const { name, description, price, stock_quantity } = req.body;
    try {
        const newProduct = await pool.query(
            'INSERT INTO products (name, description, price, stock_quantity) VALUES($1, $2, $3, $4) RETURNING *',
            [name, description, price, stock_quantity]
        );
        res.status(201).json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, stock_quantity } = req.body;

    try {
        const updatedProduct = await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3, stock_quantity = $4 WHERE id = $5 RETURNING *',
            [name, description, price, stock_quantity, productId]
        );
        if (updateProduct.rows.length === 0) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(updateProduct.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

};

// Delete product by ID
const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const deleteResult = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [productId]);
        if (deleteResult.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};