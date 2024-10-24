const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Define register route
router.post('/register', registerUser);

// Define login route
router.post('/login', loginUser);

module.exports = router;