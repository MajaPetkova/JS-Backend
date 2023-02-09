const express = require("express");
const expressSession = require("express-session");
const auth = require("./auth");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(auth());
app.get("/home", (req, res) => {
  // req.session.username= "Pesho" + Math.random();
  //   req.session.user = {
  //     username: "Peter",
  //     email: "peter@abv.bg",
  //   };
  res.sendFile(__dirname + "/index.html");
});
app.get("/cats", (req, res) => {
  console.log(req.session);
  res.send("Cats");
});
app.get("/login", (req, res) => {
  console.log(req.session.user);
  res.sendFile(__dirname + "/login.html");
});
app.post("/login", async (req, res) => {
  if (await req.auth.login(req.body.username, req.body.password)) {
    res.redirect("/home");
  } else {
    res.status(401).send("Incorrect username or password");
  }
});
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});
app.post("/register",async (req, res) => {
  if (await req.auth.register(req.body.username, req.body.password)) {
    res.redirect("/home");
  } else {
    res.status(409).send("Username already exists");
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
