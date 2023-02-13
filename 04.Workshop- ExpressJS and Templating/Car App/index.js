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
// add validation rules to Car model
// create Accessory model

const express = require("express");
const hbs = require("express-handlebars");
const session = require("express-session");
const carsService = require("./services/cars");
const accessoryService = require("./services/accessory");
const authService = require("./services/auth");

const initDb = require("./models/index");

const { about } = require("./controllers/about");
const create = require("./controllers/create");
const { details } = require("./controllers/details");
const { home } = require("./controllers/home");
const { notFound } = require("./controllers/notFound");
const deleteCar = require("./controllers/delete");
const edit = require("./controllers/edit");
const accessory = require("./controllers/accessory");
const attach = require("./controllers/attach");
const auth = require("./controllers/auth");
const { isLoggedIn } = require("./services/util");
const { body } = require("express-validator");

start();
async function start() {
  await initDb();

  const app = express();

  app.use(
    session({
      secret: "My Super Secret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  app.engine("hbs", hbs.create({ extname: ".hbs" }).engine);
  app.set("view engine", "hbs");

  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));

  app.use(carsService());
  app.use(accessoryService());
  app.use(authService());

  app.get("/", home);
  app.get("/about", about);
  app.get("/create", isLoggedIn(), create.get);
  app.post("/create", isLoggedIn(), create.post);
  app.get("/details/:id", details);
  app.get("/delete/:id", isLoggedIn(), deleteCar.get);
  app.post("/delete/:id", isLoggedIn(), deleteCar.post);
  app.get("/edit/:id", isLoggedIn(), edit.get);
  app.post("/edit/:id", isLoggedIn(), edit.post);
  app.get("/accessory", isLoggedIn(), accessory.get);
  app.post("/accessory", isLoggedIn(), accessory.post);
  app.get("/attach/:id", isLoggedIn(), attach.get);
  app.post("/attach/:id", isLoggedIn(), attach.post);
  app.get("/register", auth.registerGet);
  app.post(
    "/register",
    body("username").trim().toLowerCase(),
    body("password").trim(),
    body("repeatPassword").trim(),
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 Characters long")
      .bail()
      .isAlphanumeric()
      .withMessage("Username must contain only letters and numbers")
      .bail(),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 Characters long"),
    body("repeatPassword")
      .trim()
      .custom((value, { req }) => value == req.body.password)
      .withMessage("Passwords don't match"),
    auth.registerPost
  );
  app.get("/login", auth.loginGet);
  app.post("/login", auth.loginPost);
  app.get("/logout", auth.logoutGet);
  app.get("*", notFound);

  app.listen(3000, () => console.log("App is listening on port 3000"));
}
