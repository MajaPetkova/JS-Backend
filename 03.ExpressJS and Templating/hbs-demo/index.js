const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const hbs = handlebars.create({
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

let visitors = 0;
const products = [
  {
    name: "Product 1",
    price: 15,
  },
  {
    name: "Product 2",
    price: 48,
  },
  {
    name: "Product 3",
    price: 34,
    promoted: true
  },
];
app.get("/", (req, res) => {
  res.locals = {
    count: visitors++,
  user :{username: "Peter",
        email:"peter@abv.bg"}
  };
  res.render("home");
});
app.get("/catalog", (req, res) => {
    res.locals = {
         products
    };
    res.render("catalog");
  });

app.listen(3000, () => console.log("App is listening on port 3000"));
