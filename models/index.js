const { Sequelize } = require('sequelize');
const User = require('./User');

// Use the POSTGRES_URI from the environment variables
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false, // Disable SQL logging
});

// Sync models with the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = { sequelize, User };
