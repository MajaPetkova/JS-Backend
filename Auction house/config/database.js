const mongoose = require("mongoose");
require("../models/User");
require("../models/Auction")


const dbName = "AuctionHouse";
const connectionString = `mongodb://localhost:27017/${dbName}`;

module.exports = async (app) => {
  try {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("Database connected");
    
    mongoose.connection.on("error", (err) => {
      console.error("Database Error");
      console.error(err);
    });
  } catch (err) {
    console.error("Error connecting to database");
    process.exit(1);
  }
};
