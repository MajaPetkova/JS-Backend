const express = require("express");
const mongoose = require("mongoose");
const auth = require("./src/middlewares/auth");
const cors = require("./src/middlewares/cors");
const furnitureController = require("./src/controllers/furniture");
const usersController= require("./src/controllers/users");


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
  app.use(cors());
  app.use(auth())

  app.use("/data/catalog", furnitureController);
  app.use("/users", usersController)
  app.listen(3030, () => {
    console.log("REST Service is listening on port 3030");
  });
}
start();
