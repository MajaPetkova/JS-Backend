const express = require("express");
const expressSession = require("express-session");

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

app.get("/", (req, res) => {
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
    console.log(req.session.user)
  res.sendFile(__dirname + "/login.html");
});
app.post("/login", (req, res) => {
  if (req.body.username == "maja" && req.body.password == "123") {
    console.log("successful login");
    req.session.user = "Maja";
    res.redirect("/");
  }
//   console.log(req.session);
//   console.log(req.body);
});

app.listen(3000, () => console.log("Server is running on port 3000"));
