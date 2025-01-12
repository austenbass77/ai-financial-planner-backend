// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const authenticateUser = require('../middleware/authenticateUser');

// POST /api/users/register
router.post('/register', registerUser);

// POST /api/users/login
router.post('/login', loginUser);

// GET /api/users/profile
router.get('/profile', authenticateUser, getUserProfile);

// PUT /api/users/profile
router.put('/profile', authenticateUser, updateUserProfile);

module.exports = router;
