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
})
app.listen(3000, () => console.log("huhu"));
