const express = require('express');
const { checkoutCart, finaliseOrder  } = require('../controllers/checkoutController');
const ensureAuthenticated = require('../middlewares/authMiddleware');
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
// Route to initiate payment and return Payment intent
router.post('/checkout', ensureAuthenticated, checkoutCart);

// Route to finalise order after successful payment
router.post('/checkout/finalise', ensureAuthenticated, finaliseOrder);

module.exports = router;