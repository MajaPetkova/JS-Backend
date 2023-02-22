const Housing = require("../models/Housing");

async function getHousingById(id) {
  const housing = await Housing.findById(id);
  return housing;
}

async function createHousing(housing) {
  const result = new Housing(housing);
  await result.save();
}

module.exports = {
  getHousingById,
  createHousing,
};
