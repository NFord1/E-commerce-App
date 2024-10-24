const express = require('express');
const { getItemsFromCart, addToCart, removeItemFromCart  } = require('../controllers/cartController');
const router = express.Router();

router.get('/cart/:userId', getItemsFromCart);

router.post('/cart/:userId', addToCart);

router.delete('/cart/:userId/products/:productId', removeItemFromCart);

module.exports = router;