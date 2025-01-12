const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization header received:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No token provided or incorrect format.');
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Extracted token:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);

    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!req.user) {
      console.log('User not found.');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User authenticated:', req.user.email);
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};

module.exports = authenticateUser;
