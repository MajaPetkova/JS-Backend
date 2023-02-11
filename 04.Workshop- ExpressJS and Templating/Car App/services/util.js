const bcrypt = require("bcrypt");

function accessoryViewModel(accessory) {
  return {
    id: accessory._id,
    name: accessory.name,
    description: accessory.description,
    imageUrl: accessory.imageUrl,
    price: accessory.price,
  };
}
function carViewModel(car) {
  const model = {
    id: car._id,
    name: car.name,
    description: car.description,
    imageUrl: car.imageUrl,
    price: car.price,
    accessories: car.accessories,
  };

  if (model.accessories.length > 0 && model.accessories[0].name) {
    model.accessories = model.accessories.map(accessoryViewModel);
    // console.log(model.accessories[0])
    // console.log(typeof model.accessories[0])
    // console.log("typeCheck", model.accessories[0].name)
  }
  return model;
}

async function hashPassword(password) {
return bcrypt.hash(password, 10);

}
async function comparePasswords(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
module.exports = {
  accessoryViewModel,
  carViewModel,
  hashPassword,
  comparePasswords
};
