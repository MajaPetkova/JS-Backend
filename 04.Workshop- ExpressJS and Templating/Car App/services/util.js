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

  if (model.accessories.length > 0 ){
  
    // model.accessories = model.accessories.map(accessoryViewModel);
    console.log(model.accessories[0]._id)
    console.log(typeof model.accessories[0])
    console.log(model.accessories[0]._id.name)
  }

  return model;
}
module.exports = {
  accessoryViewModel,
  carViewModel,
};