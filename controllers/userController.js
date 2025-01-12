// controllers/userController.js
const { User } = require('../models');
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Controller to handle user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    console.log('Finding user with email:', email);
    const user = await User.findOne({ where: { email } });

    // Check if user exists
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password matches
    if (user.password !== password) {
      console.log('Incorrect password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token
    const token = generateToken(user.id);

    // Return the token and user info
    res.json({
      id: user.id,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to handle user registration
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = await User.create({ email, password });

    // Generate a token
    const token = generateToken(newUser.id);

    // Return the token and user info
    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      token,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get the user profile
const getUserProfile = async (req, res) => {
  try {
    // Return the authenticated user's profile
    res.json(req.user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { firstName, lastName, email } = req.body;

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
};
