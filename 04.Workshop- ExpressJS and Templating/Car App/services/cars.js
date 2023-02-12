// const fs = require("fs/promises");
const Car = require("../models/Car");
const { carViewModel } = require("./util");

// async function read() {
//   try {
//     const file = await fs.readFile("./services/data.json");
//     return JSON.parse(file);
//   } catch (err) {
//     console.error("Database read error");
//     console.log(err);
//     process.exit(1);
//   }
// }
// async function write(data) {
//   try {
//     await fs.writeFile("./services/data.json", JSON.stringify(data, null, 2));
//   } catch (err) {
//     console.error("Database write error");
//     console.log(err);
//     process.exit(1);
//   }
// }

async function getAllCars(query) {
  // console.log(query.search)
  const options = {
    isDeleted: false
  };
  if (query.search) {
    options.name = new RegExp(query.search, "i");
  }
  if (query.from) {
    options.price = { $gte: Number(query.from) };
  }
  if (query.to) {
    if (!options.price) {
      options.price = {};
    }
    options.price.$lte = Number(query.to);
  }
  // console.log(options)
  const cars = await Car.find(options).lean();
  return cars;
  // const data = await read();
  // // console.log(Object.entries(data))
  // let cars = Object.entries(data).map(([id, v]) =>
  //   Object.assign({}, { id }, v)
  // );

  // if (query.search) {
  //   cars = cars.filter((c) =>
  //     c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase())
  //   );
  // }
  // if (query.from) {
  //   cars = cars.filter((c) => c.price >= Number(query.from));
  // }
  // if (query.to) {
  //   cars = cars.filter((c) => c.price <= Number(query.to));
  // }
  // return cars;
}

async function getCarById(id) {
  const car = await Car.findById(id).where({isDeleted:false}).populate("accessories");
  if (car) {
    return carViewModel(car);
  } else {
    return undefined;
  }

  // const data = await read();
  // const car = data[id];
  // if (car) {
  //   return Object.assign({}, { id }, car);
  // } else {
  //   return undefined;
  // }
}
async function createCar(car) {
  const newCar = new Car(car);
  newCar.save();
  // const cars = await read();
  // let id;
  // do {
  //   id = nextId();
  // } while (cars.hasOwnProperty(id));
  // cars[id] = car;
  // await write(cars);
}

async function deleteCarById(id, ownerId) {
  // await Car.findByIdAndDelete(id);
  const existing = await Car.findById(id).where({isDeleted:false});

  if(existing.owner != ownerId){
    return false
  }
  await Car.findByIdAndUpdate(id, {isDeleted: true});
  return true;

  // await Car.findByIdAndDelete('554632346553');
  // const data = await read();

  // if (data.hasOwnProperty(id)) {
  //   delete data[id];
  //   await write(data);
  // } else {
  //   throw new ReferenceError("No such id in database");
  // }
}

async function updateCarById(id, car,ownerId ) {
  // await Car.findByIdAndUpdate(id, car);
  const existing = await Car.findById(id).where({isDeleted:false});

if(existing.owner != ownerId){
  return false
}

  existing.name = car.name;
  existing.description = car.description;
  existing.imageUrl = car.imageUrl || undefined;
  existing.price = car.price;
  existing.accessories = car.accessories;

  await existing.save();
  return true;
  // const data = await read();

  // if (data.hasOwnProperty(id)) {
  //   data[id] = car;
  //   await write(data);
  // } else {
  //   throw new ReferenceError("No such id in database");
  // }
}

async function attachAccessory(carId, accessoryId, ownerId) {
  const existing = await Car.findById(carId);

  if(existing.owner != ownerId){
    return false
  }
  existing.accessories.push(accessoryId);
  await existing.save();
}
// function nextId() {
//   return "xxxxxxxx".replace(/x/g, () =>
//     ((Math.random() * 16) | 0).toString(16)
//   );
// }
module.exports = () => (req, res, next) => {
  req.storage = {
    getAllCars,
    getCarById,
    createCar,
    updateCarById,
    deleteCarById,
    attachAccessory,
  };
  next();
};
