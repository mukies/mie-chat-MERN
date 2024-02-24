const mongoose = require("mongoose");
const url = process.env.URL;

const databaseConnection = (async () => {
  await mongoose.connect(url);
  console.log("database connected successfully !!");
})();

module.exports = databaseConnection;
