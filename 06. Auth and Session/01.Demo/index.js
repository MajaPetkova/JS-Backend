const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");

const password = "mysecretpassword";
const hashedPassword =
  "$2b$10$Qcs7obJi4TAIt3AC9VPz8uCrlKfXFULX.RfbceBDDhaL86ZymnS0a";
app.use(cookieParser());

app.get("/home", (req, res) => {
  // res.setHeader("Set-Cookie", `test=Some test value`);

  res.cookie("test", "Some test value");
  res.cookie("test2", "Some test value 2");
  res.send(`<p>Hello World</p>`);
});

app.get("/cats", (req, res) => {
  let cookies = req.cookies;
  console.log(cookies);
  res.send("I love cats");
});
app.get("/hash/:password", async (req, res) => {
  const hash = await bcrypt.hash(req.params.password, 10);
  console.log(hash);
  res.send(hash);
});
app.get("/login/:password", async (req, res) => {
  const isValidPassword = await bcrypt.compare(
    req.params.password,
    hashedPassword
  );

  if (isValidPassword) {
    res.send("Welcome, Successful Login");
    const payload = {
      username: "Peter",
    };
    const options = { expiresIn: "2d" };
    const secret = "MySuperSecret";
    const token = jwt.sign(payload, secret, options);
    console.log(token);
  } else {
    res.send("Invalid Password");
  }
  console.log(isValidPassword);
});

app.listen(3000, () => console.log("Server is running on port 3000"));
