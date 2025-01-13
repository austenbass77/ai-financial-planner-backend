const Sequelize = require('sequelize');

// Use process.env to access POSTGRES_URI from the .env file
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false,
});

const User = require('./User')(sequelize, Sequelize.DataTypes);
const UserProfile = require('./UserProfile')(sequelize, Sequelize.DataTypes);
const Asset = require('./Asset')(sequelize, Sequelize.DataTypes);
const Liability = require('./Liability')(sequelize, Sequelize.DataTypes);
const FamilyMember = require('./FamilyMember')(sequelize, Sequelize.DataTypes);

const db = {
  sequelize,
  Sequelize,
  User,
  UserProfile,
  Asset,
  Liability,
  FamilyMember,
};

// Define associations
User.hasOne(UserProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserProfile.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Asset, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Asset.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Liability, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Liability.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(FamilyMember, { foreignKey: 'account_id', onDelete: 'CASCADE' });
FamilyMember.belongsTo(User, { foreignKey: 'account_id' });

module.exports = db;
