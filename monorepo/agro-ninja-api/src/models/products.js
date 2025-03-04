const { DataTypes } = require("sequelize");
const sequelize = require("../utils/services/db_services.js");

const Product = sequelize.define("products", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    alloNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    alloNull: false,
  },
  dossage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Product;
