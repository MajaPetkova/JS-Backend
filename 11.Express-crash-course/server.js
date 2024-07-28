const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const posts = require("./routes/posts")

const app = express();

//setup static folder
// app.use(express.static(path.join(__dirname, "public")))

//Routes
app.use("/api/posts", posts)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
