const {DataTypes} = require('sequelize');
const sequelize = require('../utils/services/db_services.js');

const Categorie = sequelize.define("categories", {
    name: {
      type: DataTypes.STRING,
      alloNull: false,
    },
    description:{
        type: DataTypes.STRING,
        alloNull: false,
    },
    category: {
      type: DataTypes.STRING,
      alloNull: false,
    },
  });


module.exports = Categorie;