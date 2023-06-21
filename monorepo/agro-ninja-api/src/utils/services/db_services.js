require('dotenv').config();
const {Sequelize} = require('sequelize');
const dialect = process.env.DIALECT;
const storage = process.env.STORAGE;
const database = process.env.DATABASE;

const sequelize = new Sequelize({dialect, storage, database});

module.exports = sequelize;
