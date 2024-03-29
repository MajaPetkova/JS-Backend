const express= require("express");
const expressConfig= require("./config/express")
const databaseConfig = require("./config/database");
const routesConfig = require ("./config/routers");

start()
async function start(){

    const app = express();

    expressConfig(app);
    await databaseConfig(app)
    routesConfig(app);


    app.get("/", (req, res)=>{
        console.log(req.session);
        res.render("home")
    })
    app.listen("5000" , ()=>console.log("Server is listening on port 5000"))
}