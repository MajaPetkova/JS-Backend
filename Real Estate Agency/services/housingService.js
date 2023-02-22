const Housing = require("../models/Housing");


async function getAllHousings(){
 return await Housing.find({}).lean();
  
}
async function getHousingById(id) {
return await Housing.findById(id);

}
async function getHousingAndUsers(id) {
return  await Housing.findById(id).populate("owner").populate("rentedHome").lean();
}

async function createHousing(housing) {
  const result = new Housing(housing);
  await result.save();
}

module.exports = {
  getAllHousings,
  getHousingById,
  getHousingAndUsers,
  createHousing,
};
