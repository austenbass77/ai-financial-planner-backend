// models/index.js

require('dotenv').config(); // Ensure .env is loaded

const Sequelize = require('sequelize');

// Get POSTGRES_URI from environment variables
const dbUrl = process.env.POSTGRES_URI;

if (!dbUrl) {
  throw new Error('POSTGRES_URI is not defined in .env');
}

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false,
});

// Models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const UserProfile = require('./UserProfile')(sequelize, Sequelize.DataTypes);
const FamilyMember = require('./FamilyMember')(sequelize, Sequelize.DataTypes);

// Relationships
User.hasOne(UserProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserProfile.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(FamilyMember, { foreignKey: 'account_id', onDelete: 'CASCADE' });
FamilyMember.belongsTo(User, { foreignKey: 'account_id' });

const db = {
  sequelize,
  Sequelize,
  User,
  UserProfile,
  FamilyMember,
};

module.exports = db;
