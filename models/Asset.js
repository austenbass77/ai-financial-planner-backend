const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {}

  Asset.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      asset_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      asset_value: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Asset',
      timestamps: true,
    }
  );

  return Asset;
};
