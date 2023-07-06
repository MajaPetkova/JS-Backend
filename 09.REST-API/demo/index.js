const express = require("express");

const data = [
  {
    id: 1111,
    name: "First",
  },
  {
    id: 1112,
    name: "Second",
  },
  {
    id: 1113,
    name: "Third",
  },
];
const app = express();

app.get("/catalog", (req, res) => {
  res.json({ data });
});

app.get("/catalog/:id", (req, res) => {
  const id = req.params.id;
  const item = data.find(i => i.id == id);
  if(item){
    res.json(item)
  }else{
    res.status(404).json({error:"Resource not found"})
  }
  res.json(item);
});

app.listen(5000, () => {
  console.log("App is listening on port 5000");
});
