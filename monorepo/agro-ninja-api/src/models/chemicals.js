const { DataTypes } = require("sequelize");
const sequelize = require("../utils/services/db_services.js");

const Chemical = sequelize.define("chemicals", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    alloNull: false,
  },
  description: {
    type: DataTypes.STRING,
    alloNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  chemicalType: {
    type: DataTypes.STRING,
    alloNull: false,
  },
});

module.exports = Chemical;
