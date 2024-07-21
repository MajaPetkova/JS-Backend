const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from node API");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

mongoose
  .connect(
    `mongodb+srv://majapetkova11:OwJ7AeSabefqkPPr@backenddb.atxz2y4.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB`
  )
  .then(() => {
    console.log("DB Connected");
    app.listen(3000, () => {
      console.log("App is listening on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
