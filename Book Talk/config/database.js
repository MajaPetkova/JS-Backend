const mongoose = require("mongoose");

// TODO: Change database name
const dbName = "BookTalk";
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
