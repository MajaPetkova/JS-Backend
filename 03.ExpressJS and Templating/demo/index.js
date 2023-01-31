const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.post("/create", (req, res) => {
  res.status(201);
  res.send("Article created");
});

app.get("/create", (req, res)=>{
    res.send('<form method="POST"><input name= "name"/><button>SEND</button></form>')
});
app.get("/catalog", (req, res)=> {
    res.send("Catalog")
});
app.get("/catalog/*", (req, res)=> {
    res.send("Product Page")
})
app.all("*", (req, res)=>{
    res.send("404 Custom Not Found Page")
});
app.listen(3000, () => console.log("huhu"));
