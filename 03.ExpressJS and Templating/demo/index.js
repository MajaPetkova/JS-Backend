const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.post("/create", (req, res) => {
  res.status(201).json({
  _id: "62126jgc6",
  name: "Product 1",
  price: 56
  });
  res.send("Article created");
});

app.get("/create", (req, res)=>{
    res.send('<form method="POST"><input name= "name"/><button>SEND</button></form>')
});
app.get("/about",( req, res)=>{
    res.send("About Page")
})
app.get("/catalog", (req, res)=> {
    res.send("Catalog")
});
app.get("/contact", (req, res) =>{
    res.redirect("/about")
})
app.get("/catalog/:productId", (req, res)=> {
    console.log(req.params)
    res.send(`Product with id ${req.params.productId}`)
})
app.get("/catalog/:category/:productId", (req, res)=> {
    res.send("Product from Category")
});
app.get("/catalog/*", (req, res)=> {
    res.send("Product Page")
})
app.all("*", (req, res)=>{
    res.send("404 Custom Not Found Page")
});
app.listen(3000, () => console.log("huhu"));
