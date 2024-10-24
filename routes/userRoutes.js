const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();

// User routes
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.put('/users/:userId', updateUser);

module.exports = router;