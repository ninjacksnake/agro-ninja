require("dotenv").config();

const { Sequelize } = require("sequelize");
const dialect = process.env.DIALECT;
const host = process.env.HOST;
const database = process.env.DATABASE;
const dbusername = process.env.DBUSERNAME;
const dbpassword = process.env.DBPASSWORD;
const port = 5432;

const sequelize = new Sequelize(database, dbusername, dbpassword, {
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
  logging:  console.log,
});

module.exports = sequelize;
