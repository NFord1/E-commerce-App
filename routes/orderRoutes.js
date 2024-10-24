const express = require('express');
const { getAllOrdersByUser, getOrderById  } = require('../controllers/orderController');
const router = express.Router();

/**
 * @swagger
 * /orders/{userId}:
 *   get:
 *     summary: Get all orders for a user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of user orders
 *       404:
 *         description: No orders found for this user
 */
// Get all orders for a user
router.get('/orders/:userId', getAllOrdersByUser);

/**
 * @swagger
 * /orders/{orderId}/details:
 *   get:
 *     summary: Get details of a specific order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order details
 *       404:
 *         description: Order not found
 */
// Get details of a specific order
router.get('/orders/:orderId/details', getOrderById);


module.exports = router;