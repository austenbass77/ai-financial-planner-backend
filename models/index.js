// models/index.js
const { Sequelize } = require('sequelize');
const UserModel = require('./User');

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false,
});

// Initialize models
const User = UserModel(sequelize);

// Sync the models with the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = {
  sequelize,
  User,
};
