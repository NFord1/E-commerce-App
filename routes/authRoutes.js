const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const passport = require('passport');
const router = express.Router();


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
// Define register route
router.post('/register', registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid email or password
 */
// Define login route
router.post('/login', loginUser);

// Route to initiate Google login
router.get('/google', passport.authenticate('google',{scope: ['profile', 'email']}));

// Route to handle google login callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
(req, res) => {
    // Successful authentication, redirect to the frontend
    res.redirect('http://localhost:3000/products');
}
);

// Test route to check session and logged-in user
router.get('/current_user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({user: req.user});
    } else {
        res.status(401).json({message: 'User not logged in'});
    }
});

// Define logout route
router.get('/logout', logoutUser);

module.exports = router;