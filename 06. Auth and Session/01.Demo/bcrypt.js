const bcrypt = require("bcrypt");

const salt ="$2b$10$7BDFdZhzhsM6JsIb6vzOo.";
const password1 = "secret pass";

async function start() {
    // const salt= await bcrypt.genSalt(10); //generate salt
  const hash = await bcrypt.hash(password1, salt);
  console.log(hash);
  console.log(salt)
}
start();
