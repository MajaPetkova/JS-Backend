const mongoose = require("mongoose");
require("../models/User");


const dbName = "realEstate";
const connectionString = `mongodb://localhost:27017/${dbName}`;

module.exports = async (app) => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on("error", (err) => {
      console.error("Database error");
      console.error(err);
    });
    console.log("Database connected");
  } catch (err) {
    console.error("Error connecting to database");
    process.exit(1);
  }
};
