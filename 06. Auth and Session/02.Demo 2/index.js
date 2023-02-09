const express = require("express");
const hbs = require("express-handlebars");
const bcrypt = require("bcrypt");

const app = express();

const usersSession = {};

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (usersSession[email]) {
    res.status(400).send("User already exists");
  }

  const hash = await bcrypt.hash(password, 10);

  usersSession[email] = {
    email,
    password: hash,
  };
  res.redirect("/login");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const isAuthenticated = await bcrypt.compare(password, usersSession[email].password);

  if (isAuthenticated) {

    res.redirect("/");
  } else {
    res.status(401).send("Wrong username or password");
  }
});

app.listen(5000, () => console.log("Server is listening on port 5000"));
