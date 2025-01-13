module.exports = (sequelize, DataTypes) => {
  return sequelize.define('FamilyMember', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING,
    },
    additional_info: {
      type: DataTypes.JSONB,
    },
  });
};
