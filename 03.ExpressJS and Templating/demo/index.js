const express = require("express");
const { isAdmin } = require("./auth");
const catalogController = require("./catalog");
const logger= require("./logger");


const app = express();

app.use(logger);
app.use("/content", express.static("public"))
app.use("/catalog", catalogController);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  //   res.download("./index.html")
});

app.get("/getOrder",  
(req, res) => {
  res.download(__dirname + "/document.pdf");
});

app.post("/create",isAdmin, (req, res) => {
  res.status(201).json({
    _id: "62126jgc6",
    name: "Product 1",
    price: 56,
  });
  res.send("Article created");
});

app.get("/create", (req, res) => {
  res.send(
    '<form method="POST"><input name= "name"/><button>SEND</button></form>'
  );
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/contact", (req, res) => {
  res.redirect("/about");
});

app.all("*", (req, res) => {
  res.send("404 Custom Not Found Page");
});

app.listen(3000, () => console.log("hello"));
