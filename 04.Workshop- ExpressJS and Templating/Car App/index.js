// initialize and configure express app
// initialize templating library
// create home controller
// bind routing
// create layout
// create data service
// implement controllers
// add database connection
// create Car model
// upgrade car service to use Car model
// create Accessory model

const express = require("express");
const hbs = require("express-handlebars");
const carsService = require("./services/cars");

const initDb = require("./models/index");

const { about } = require("./controllers/about");
const create = require("./controllers/create");
const { details } = require("./controllers/details");
const { home } = require("./controllers/home");
const { notFound } = require("./controllers/notFound");
const deleteCar = require("./controllers/delete");
const edit = require("./controllers/edit");


start();
async function start() {
   await initDb();

  const app = express();

  app.engine("hbs", hbs.create({ extname: ".hbs", }).engine);
  app.set("view engine", "hbs");

  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));

  app.use(carsService());

  app.get("/", home);
  app.get("/about", about);
  app.get("/create", create.get);
  app.post("/create", create.post);
  app.get("/details/:id", details);
  app.get("/delete/:id", deleteCar.get);
  app.post("/delete/:id", deleteCar.post);
  app.get("/edit/:id", edit.get);
  app.post("/edit/:id", edit.post);
  app.get("*", notFound);

  app.listen(3000, () => console.log("App is listening on port 3000"));
}
