const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Liability extends Model {}

  Liability.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      liability_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      liability_value: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Liability',
      timestamps: true,
    }
  );

  return Liability;
};
