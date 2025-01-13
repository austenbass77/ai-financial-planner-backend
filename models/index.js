const Sequelize = require('sequelize');
const dbConfig = require('../config/db');

const sequelize = new Sequelize(dbConfig.POSTGRES_URI, {
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

User.hasOne(UserProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserProfile.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Asset, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Asset.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Liability, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Liability.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(FamilyMember, { foreignKey: 'account_id', onDelete: 'CASCADE' });
FamilyMember.belongsTo(User, { foreignKey: 'account_id' });

module.exports = db;
