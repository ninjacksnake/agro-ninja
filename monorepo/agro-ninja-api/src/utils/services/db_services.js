require("dotenv").config();

const { Sequelize } = require("sequelize");
const dialect = process.env.DIALECT;
const host = process.env.HOST;
const database = process.env.DATABASE;
const username = process.env.DBUSERNAME;
const password = process.env.DBPASSWORD;
const port = process.env.PORT || 5430;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  getmasterpublicker: 1,
  port: port,
  dialectOptions: {
    ssl: {
      require: true, // Ensure SSL is used
      rejectUnauthorized: false, // Accept self-signed certs
    },
  },
  logging: console.log,
});

module.exports = sequelize;
