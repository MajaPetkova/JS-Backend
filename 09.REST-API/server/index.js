const express = require("express");
const mongoose = require("mongoose");
const cors = require("./middlewares/cors");

async function start() {
  try {
    const db = await mongoose.connect("mongodb://localhost:27017/furniture");
    console.log("DB ready");
  } catch (err) {
    console.log("Error connecting to database");
    return process.exit(1);
  }

  const app = express();

  app.use(express.json());
  app.use(cors())
  
  app.listen(3030, () => { console.log("REST Service is listening on port 3030")
  });
}
start();

