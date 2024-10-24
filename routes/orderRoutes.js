const express = require('express');
const { getAllOrdersByUser, getOrderById  } = require('../controllers/orderController');
const router = express.Router();

router.get('/orders/:userId', getAllOrdersByUser);

router.get('/orders/:orderId/details', getOrderById);


module.exports = router;