const express = require('express');
const { checkoutCart  } = require('../controllers/checkoutController');
const router = express.Router();

/**
 * @swagger
 * /cart/{userId}/checkout:
 *   post:
 *     summary: Checkout a user's cart and create an order
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       404:
 *         description: No items in the cart
 */
// Checkout a user's cart and create an order
router.post('/cart/:userId/checkout', checkoutCart);

module.exports = router;