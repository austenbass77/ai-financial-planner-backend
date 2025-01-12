require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Connect to PostgreSQL
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Routes
app.use('/api/users', userRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
