const bcrypt = require("bcrypt");

// const salt ="$2b$10$7BDFdZhzhsM6JsIb6vzOo.";
const salt= 10;
const password1 = "secret pass";
// const hash= "$2b$10$7BDFdZhzhsM6JsIb6vzOo.c9rX48xz8OvS73oOzsmHzrsw5YL7xvy"
async function start() {
    // const salt= await bcrypt.genSalt(10); //generate salt
  const hash = await bcrypt.hash(password1, salt);

// console.log(await bcrypt.compare( password1, hash))
  console.log(hash);
//   console.log(salt)
}
start();
