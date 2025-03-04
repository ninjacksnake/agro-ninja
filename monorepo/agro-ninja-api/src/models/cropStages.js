const {DataTypes} = require('sequelize');
const sequelize = require('../utils/services/db_services.js');

const CropStage = sequelize.define("cropStages", {
    name: {
      type: DataTypes.STRING,
      alloNull: false,
      unique:true
    },
    time: {
      type: DataTypes.STRING,
      alloNull: true,
    },
    description:{
        type: DataTypes.STRING,
        alloNull: false,
    },
  });


module.exports = CropStage;