const Sequelize = require('sequelize');
const dbConfig = require('../config/db');

// Initialize Sequelize instance
const sequelize = new Sequelize(dbConfig.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const UserProfile = require('./UserProfile')(sequelize, Sequelize.DataTypes);
const FamilyMember = require('./FamilyMember')(sequelize, Sequelize.DataTypes);

// Define associations
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
