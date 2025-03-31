const {DataTypes} = require('sequelize');
const sequelize = require('../utils/services/db_services.js');

const DiseaseType = sequelize.define("diseaseTypes", {
    name: {
      type: DataTypes.STRING,
      alloNull: false,
      unique:true
    },
    description:{
        type: DataTypes.STRING,
        alloNull: false,
    }
  });


module.exports = DiseaseType
;