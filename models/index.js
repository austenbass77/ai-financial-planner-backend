const Sequelize = require('sequelize');
require('dotenv').config(); // Ensure .env is loaded

// Use POSTGRES_URI from the .env file
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false,
});

// Import models
const User = require('./User')(sequelize);
const UserProfile = require('./UserProfile')(sequelize);
const FamilyMember = require('./FamilyMember')(sequelize);

// Define relationships
const db = {
  sequelize,
  Sequelize,
  User,
  UserProfile,
  FamilyMember,
};

User.hasOne(UserProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserProfile.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(FamilyMember, { foreignKey: 'account_id', onDelete: 'CASCADE' });
FamilyMember.belongsTo(User, { foreignKey: 'account_id' });

module.exports = db;
