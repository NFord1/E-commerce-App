const express = require('express');
const { getItemsFromCart, addToCart, removeItemFromCart, adjustQuantity  } = require('../controllers/cartController');
const ensureAuthenticated = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: get items from a users cart by Id
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       400:
 *         description: No items found in cart
 */
// Route to get items from a users cart by Id
router.get('/cart', ensureAuthenticated, getItemsFromCart);

/**
 * @swagger
 * /cart/{userId}:
 *   post:
 *     summary: Add a product to a user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *       404:
 *         description: Cart not found
 */
// Route to add a product to a user's cart
router.post('/cart', ensureAuthenticated, addToCart);


/**
 * @swagger
 * /cart/{userId}/products/{productId}:
 *   delete:
 *     summary: Remove a product from a user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *       404:
 *         description: Product not found in cart
 */
// Route to remove a product from a user's cart
router.delete('/cart/:productId', ensureAuthenticated, removeItemFromCart);

// Route to update quantity of item in cart
router.patch('/cart/:productId', ensureAuthenticated, adjustQuantity);

module.exports = router;