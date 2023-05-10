const {DataTypes} = require('sequelize');
const sequelize = require('../utils/services/db_services.js');

const Chemical = sequelize.define("chemicals", {
    name: {
      type: DataTypes.STRING,
      alloNull: false,
    },
    description:{
        type: DataTypes.STRING,
        alloNull: false,
    },
    type: {
      type: DataTypes.STRING,
      alloNull: false,
    },
  });


module.exports = Chemical;