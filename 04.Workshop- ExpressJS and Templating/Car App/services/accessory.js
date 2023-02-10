const Accessory = require("../models/Accessories");
const { accessoryViewModel } = require("./util");


async function getAllAccessories() {
  const data = await Accessory.find({});
  return data.map(accessoryViewModel)
}

async function createAccessory(accessory) {
  await Accessory.create(accessory);
}
module.exports = () => (req, res, next) => {
  req.accessory = {
    createAccessory,
    getAllAccessories,
  };
  next();
};
