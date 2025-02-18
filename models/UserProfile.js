const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {}

  UserProfile.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'UserProfile',
      timestamps: true,
    }
  );

  return UserProfile;
};
