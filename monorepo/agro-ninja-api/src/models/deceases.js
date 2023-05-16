const {DataTypes} = require('sequelize');
const sequelize = require('../utils/services/db_services.js');

const Decease = sequelize.define("decease", {
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
    }
  });


module.exports = Decease;