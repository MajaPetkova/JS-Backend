const express = require("express");
const hbs = require("express-handlebars");
const homeController= require("./src/home");


const app = express();

app.engine(".hbs", hbs.create({ extname: ".hbs" }).engine);
app.set("view engine" , ".hbs" )


app.use("/content" , express.static("static"))
app.get("/" , homeController )
app.listen(3000, ()=> console.log("App listening on port 3000"));

// Home page
// Catalog
// - list of products
// -create product
// -edit product
// -delete product
// *shopping card
// About Us

