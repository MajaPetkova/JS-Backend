const Housing = require("../models/Housing");


async function getAllHousings(){
 return await Housing.find({}).lean();
  
}
async function getHousingById(id) {
  const housing = await Housing.findById(id);
  return housing;
}

async function createHousing(housing) {
  const result = new Housing(housing);
  await result.save();
}

module.exports = {
  getAllHousings,
  getHousingById,
  createHousing,
};
