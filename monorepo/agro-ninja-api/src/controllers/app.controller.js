const Index = require("../models/index.js");

const syncDb = async () => {
  try {
    await Index.sync();  
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
    syncDb
}