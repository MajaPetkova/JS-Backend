const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route")

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", productRoute)

app.get("/", (req, res) => {
  res.send("Hello from node API");
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
