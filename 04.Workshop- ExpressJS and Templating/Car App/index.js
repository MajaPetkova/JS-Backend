// initialize and configure express app
// initialize templating library
// create home controller
// bind routing
// create data service
// implement controllers

const express = require("express");
const hbs = require("express-handlebars");

const app = express();

app.engine("hbs", hbs.create({
    extname: ".hbs"
}).engine);
app.set("view engine", hbs);

app.use(express.urlencoded({extended:true}));
app.use("/static", express.static("static"));

app.listen(3000, () => console.log("App is listening on port 3000"));
