const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();

// User routes

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only or if you want to list all users)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */
// Get all users
router.get('/users', getAllUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a specific user's details by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: User not found
 */
// Get a specific user's details by ID
router.get('/users/:userId', getUserById);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update a user's profile information
 *     tags: [Users]
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
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       404:
 *         description: User not found
 */
// Update a user's profile information
router.put('/users/:userId', updateUser);

module.exports = router;