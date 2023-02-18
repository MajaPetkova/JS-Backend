const express= require("express");
const {create: handlebars} = require("express-handlebars");
const session = require("express-session");


start()
async function start(){

    const app = express();

    app.engine(".hbs", handlebars({
      extname: ".hbs"
    }).engine);
    app.set("view engine", ".hbs");

    app.use("/static", express.static("static"));
    app.use(session({
        secret: "jhfdjhdkdsecreet",
        resave: false,
        saveUninitialized:true,
        cookie: {
            secure: false
        }
    }));


    app.get("/", (req, res)=>{
        res.render("home", {layout: false})
    })
    app.listen("5000" , ()=>console.log("Server is listening on port 5000"))
}