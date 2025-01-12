const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getUserProfile, updateUserProfile, handleChatMessage  } = require('../controllers/userController');
const authenticateUser = require('../middleware/authenticateUser');

// Route to register a new user
router.post('/register', registerUser);

// Route to log in an existing user
router.post('/login', loginUser);

// Route to get the user's profile (protected route)
router.get('/profile', authenticateUser, getUserProfile);

// Placeholder for future PUT route (update user profile)
router.put('/profile', authenticateUser, updateUserProfile);

// chat bot
router.post('/chat', authenticateUser, handleChatMessage);

module.exports = router;
