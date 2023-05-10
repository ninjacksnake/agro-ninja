const {sync} = require("../models/index.js");

const syncDb = async (req, res, next) => {
  try {
    await sync();
    return res.status(200).send("database sync complete");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

module.exports = {
    syncDb
}