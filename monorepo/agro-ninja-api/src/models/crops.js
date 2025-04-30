const {DataTypes} = require('sequelize');
const sequelize = require('../utils/services/db_services.js');

const Crop = sequelize.define("Crops", {
    name: {
      type: DataTypes.STRING,
      alloNull: false,
      unique:true
    },
    photo: {
      type: DataTypes.STRING,
      alloNull: true,
    },
    description:{
        type: DataTypes.STRING,
        alloNull: false,
    },
    cropTypeId:{
        type: DataTypes.INTEGER,
        alloNull: false
    },
  });


module.exports = Crop;