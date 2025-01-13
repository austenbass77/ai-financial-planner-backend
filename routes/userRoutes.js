const express = require('express');
const {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  handleChatMessage,
} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authenticateUser');

const router = express.Router();

// Routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile);
router.post('/chat', authenticateUser, handleChatMessage);

module.exports = router;
