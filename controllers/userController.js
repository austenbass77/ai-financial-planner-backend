// controllers/userController.js
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { Configuration, OpenAI } = require('openai');
const bcrypt = require('bcryptjs'); // Use bcryptjs for hashing

// Function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(`Finding user with email: ${email}`);
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user.id);
    res.status(200).json({
      id: user.id,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
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

// Set up OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send message to OpenAI for interpretation
    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that updates user profiles in a database. Interpret the user\'s message to extract first name, last name, and email updates. Respond with a structured JSON object like this: {"firstName": "", "lastName": "", "email": ""}.' },
        { role: 'user', content: message },
      ],
      max_tokens: 150,
    });

    const botResponse = openaiResponse.choices[0].message.content.trim();
    console.log('OpenAI Response:', botResponse);

    // Parse the bot's response as JSON
    let profileUpdates;
    try {
      profileUpdates = JSON.parse(botResponse);
    } catch (error) {
      console.error('Failed to parse OpenAI response as JSON:', error);
      return res.json({ response: "I'm not sure how to handle that request. Please try rephrasing it." });
    }

    // Update the user's profile based on extracted entities
    if (profileUpdates.firstName) {
      user.firstName = profileUpdates.firstName;
    }
    if (profileUpdates.lastName) {
      user.lastName = profileUpdates.lastName;
    }
    if (profileUpdates.email) {
      user.email = profileUpdates.email;
    }

    await user.save();
    return res.json({ response: 'Your profile has been updated successfully.' });
  } catch (error) {
    console.error('Error handling chat message:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  handleChatMessage,
};
