const express = require("express");
const dotenv = require("dotenv").config();


const app= express();
const port = ( process.env.PORT ) || 4000;

app.use("/api/contacts", require("./routes/contactRoutes"))

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
})