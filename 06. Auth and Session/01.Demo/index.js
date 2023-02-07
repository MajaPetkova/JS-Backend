const express = require("express");
const app = express();
const cookieParser= require("cookie-parser");


app.use(cookieParser())

app.get("/", (req, res) => {
  // res.setHeader("Set-Cookie", `test=Some test value`);
  
  res.cookie("test", "Some test value");
  res.cookie("test2", "Some test value 2");
  res.send(`<p>Hello World</p>`);
});

app.get("/cats", (req, res)=>{
  let cookies= req.cookies;
  console.log(cookies);
  res.send("I love cats")
})
app.listen(3000, () => console.log("Server is running on port 3000"));
