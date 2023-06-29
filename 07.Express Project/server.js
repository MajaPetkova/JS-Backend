const express = require("express");
const dotenv = require("dotenv").config();


const app= express();
const port = ( process.env.PORT ) || 4000;

app.get("/", (req, res)=>{
    res.send("home")
})

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
})