const {DataTypes} = require('sequelize');
const sequelize = require('../utils/services/db_services.js');

const CropType = sequelize.define("cropTypes", {
    name: {
      type: DataTypes.STRING,
      alloNull: false,
      unique:true
    },
    description:{
        type: DataTypes.STRING,
        alloNull: false,
    },
  });


module.exports = CropType;