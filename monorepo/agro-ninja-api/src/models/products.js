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
  category: {
    type: DataTypes.STRING,
    alloNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

module.exports = Product;
