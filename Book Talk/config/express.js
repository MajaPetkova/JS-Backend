const express= require("express");
const {create: handlebars}= require("express-handlebars");
const session= require("express-session");
const userSession = require("../middleware/userSession");


module.exports =(app)=>{
    app.engine("hbs", handlebars({
        extname: ".hbs"
    }).engine);
    
    app.set("view engine", ".hbs")
    app.use("/public", express.static("public"));
    app.use(session({
        secret:"kffdjhgfhfdkjgkjgjdgj",
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
        }));
    app.use(express.urlencoded({extended: true })) ;
    app.use(userSession())
}