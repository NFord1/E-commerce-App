const express = require('express');
const { checkoutCart  } = require('../controllers/checkoutController');
const router = express.Router();

router.post('/cart/:userId/checkout', checkoutCart);

module.exports = router;