const bcrypt = require('bcryptjs'); // Updated to bcryptjs
const { User } = require('../models');
const { validationResult } = require('express-validator');

// Register User
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Error registering user:', err); // Error logging
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password); // Updated to bcryptjs
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Respond with user info (you may want to add a JWT token here)
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Error logging in user:', err); // Error logging
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  const userId = req.user.id; // Assuming the user ID is stored in the JWT payload or session

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('Error retrieving user profile:', err); // Error logging
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  const userId = req.user.id; // Assuming the user ID is stored in the JWT payload or session
  const { username, email } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user profile details
    await user.update({ username, email });

    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (err) {
    console.error('Error updating user profile:', err); // Error logging
    res.status(500).json({ message: 'Server error' });
  }
};

// Handle Chat Message (Example: Saving user chat messages)
const handleChatMessage = async (req, res) => {
  const userId = req.user.id; // Assuming the user ID is stored in the JWT payload or session
  const { message } = req.body;

  try {
    // Assuming you have a ChatMessage model or similar to store chat messages
    const chatMessage = await ChatMessage.create({
      userId,
      message,
    });

    res.status(201).json({ message: 'Message sent successfully', chatMessage });
  } catch (err) {
    console.error('Error handling chat message:', err); // Error logging
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser, // Added loginUser back in
  getUserProfile,
  updateUserProfile,
  handleChatMessage
};
