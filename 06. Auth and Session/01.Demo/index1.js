const express = require("express");
const expressSession = require("express-session");

const app = express();


app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get("/", (req, res) => {
    // req.session.username= "Pesho" + Math.random();
    req.session.user={
        username: "Peter",
        email: "peter@abv.bg"
    }
    res.send("Hello World")
});
app.get("/cats", (req, res) => {
 console.log(req.session)
    res.send("Cats")
});

app.listen(3000, () => console.log("Server is running on port 3000"));
