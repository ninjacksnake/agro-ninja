const {DataTypes} = require('sequelize');
const sequelize = require('../utils/services/db_services.js');


const Disease = sequelize.define("diseases", {
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
    diseaseTypeId: {
      type: DataTypes.INTEGER,
      alloNull: false,
    }
  

  });


module.exports = Disease;