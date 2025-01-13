const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FamilyMember extends Model {}

  FamilyMember.init(
    {
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      relationship: {
        type: DataTypes.STRING,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      preferred_name: {
        type: DataTypes.STRING,
      },
      birth_date: {
        type: DataTypes.DATEONLY,
      },
      email: {
        type: DataTypes.STRING,
      },
      additional_info: {
        type: DataTypes.JSONB,
      },
    },
    {
      sequelize,
      modelName: 'FamilyMember',
      timestamps: true,
    }
  );

  return FamilyMember;
};
