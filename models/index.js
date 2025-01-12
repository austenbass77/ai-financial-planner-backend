const { Sequelize } = require('sequelize');

// Use the POSTGRES_URI from the environment variables
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false, // Disable SQL logging
});

module.exports = { sequelize };
