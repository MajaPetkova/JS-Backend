const Housing = require("../models/Housing");

async function getAllHousings() {
  return await Housing.find({}).lean();
}
async function getHousingById(id) {
  return await Housing.findById(id).lean();
}
async function getHousingAndUsers(id) {
  return await Housing.findById(id)
    .populate("owner")
    .populate("rentedHome")
    .lean();
}

async function createHousing(housing) {
  const result = new Housing(housing);
  await result.save();
}

async function updateHousing(id, housing) {
  const existing = await Housing.findById(id);

  existing.name = housing.name;
  existing.type = housing.type;
  existing.year = housing.year;
  existing.city = housing.city;
  existing.image = housing.image;
  existing.description = housing.description;
  existing.availablePieces = housing.availablePieces;

  await existing.save();
}

module.exports = {
  getAllHousings,
  getHousingById,
  getHousingAndUsers,
  createHousing,
  updateHousing
};
