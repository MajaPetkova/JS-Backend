const express = require("express");
const expressSession = require("express-session");

const app = express();
app.use(express.urlencoded({ extended: true }));

const users = {
  "peter": {
    username:"peter",
    password: "123",
  },
  "john": {
    username:"john",
    password: "123",
  },
};
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
  console.log(req.session.user);
  res.sendFile(__dirname + "/login.html");
});
app.post("/login", (req, res) => {
  const user = users[req.body.username];

  if (user && req.body.password == user.password) {
    console.log("successful login " + req.body.username);
    req.session.user = user;
    res.redirect("/");
  } else {
    res.status(401).send("Incorrect username or password");
  }
    console.log(req.session);
  //   console.log(req.body);
});
app.get("/register", (req, res)=>{
    res.sendFile(__dirname + "/register.html")
});
app.post ("/register", (req, res) =>{
    const user= {
        username: req.body.username,
        password: req.body.password,
    }
    users[req.body.username] = user;
    console.log("successful register " + req.body.username)
    res.redirect("/")
})

app.listen(3000, () => console.log("Server is running on port 3000"));
