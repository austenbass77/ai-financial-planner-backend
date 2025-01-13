const Sequelize = require('sequelize');
const dbConfig = require('../config/db');

const sequelize = new Sequelize(dbConfig.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false,
});

const User = require('./User')(sequelize);
const UserProfile = require('./UserProfile')(sequelize);
const FamilyMember = require('./FamilyMember')(sequelize);

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
