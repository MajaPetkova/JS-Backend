const Accessory = require("../models/Accessories");

function mapToViewModel(accessory) {
  return {
    id:accessory._id,
    name: accessory.name,
    description: accessory.description,
    imageUrl: accessory.imageUrl,
    price: accessory.price,
  };
}

async function createAccessory(accessory) {
  await Accessory.create(accessory);
}

async function getAllAccessories() {
  const data = await Accessory.find({});
  return data.map(mapToViewModel)
}

module.exports = () => (req, res, next) => {
  req.accessory = {
    createAccessory,
    getAllAccessories,
  };
  next();
};
