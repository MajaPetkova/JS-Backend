
const fs = require("fs/promises");

async function read() {
  try {
    const file = await fs.readFile("./services/data.json");
    return JSON.parse(file);
  } catch (err) {
    console.error("Database read error");
    console.log(err);
    process.exit(1);
  }
}
async function write(data) {
  try {
    await fs.writeFile("./services/data.json", JSON.stringify(data));
  } catch (err) {
    console.error("Database write error");
    console.log(err);
    process.exit(1);
  }
}

async function getAllCars() {
  const data = await read();
    // console.log(Object.entries(data))
  return Object.entries(data).map(([id, v]) => Object.assign({}, { id }, v));
}

module.exports = () => (req, res, next) => {
  req.storage = {
    getAllCars
  };
  next();
};
