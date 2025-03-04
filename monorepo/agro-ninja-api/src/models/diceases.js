const {DataTypes} = require('sequelize');
const sequelize = require('../utils/services/db_services.js');

const Disease = sequelize.define("diceases", {
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
    type:{
        type: DataTypes.STRING,
        alloNull: false,
    }

  });


module.exports = Disease;