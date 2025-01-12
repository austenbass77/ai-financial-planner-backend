require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Import your routes and middleware
const userRoutes = require('./routes/userRoutes'); // Import user routes
const profileRoutes = require('./routes/profileRoutes');
const chatRoutes = require('./routes/chatRoutes');
const familyMembersRouter = require('./routes/familyMembers');
const authenticateUser = require('./middleware/authenticateUser');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for cross-origin requests
app.use(morgan('dev')); // Logging middleware

// Routes
app.use('/api/users', userRoutes); // Use user routes under /api/users
app.use('/api/profile', authenticateUser, profileRoutes);
app.use('/api/chat', authenticateUser, chatRoutes);
app.use('/api/family-members', authenticateUser, familyMembersRouter);

// Error handling middleware (must come after routes)
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
