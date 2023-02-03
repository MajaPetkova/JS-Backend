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
    await fs.writeFile("./services/data.json", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Database write error");
    console.log(err);
    process.exit(1);
  }
}

async function getAllCars(query) {
  const data = await read();
  // console.log(Object.entries(data))
  let cars = Object.entries(data).map(([id, v]) =>
    Object.assign({}, { id }, v)
  );

  if (query.search) {
    cars = cars.filter((c) =>
      c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase())
    );
  }
  if (query.from) {
    cars = cars.filter((c) => c.price >= Number(query.from));
  }
  if (query.to) {
    cars = cars.filter((c) => c.price <= Number(query.to));
  }
  return cars;
}

async function getCarById(id) {
  const data = await read();
  const car = data[id];
  if (car) {
    return Object.assign({}, { id }, car);
  } else {
    return undefined;
  }
}
async function createCar(car) {
  const cars = await read();
  let id;
  do {
    id = nextId();
  } while (cars.hasOwnProperty(id));
  cars[id] = car;
  await write(cars);
}

async function deleteCarById(id) {
  const data = await read();

  if (data.hasOwnProperty(id)) {
    delete data[id];
    await write(data)
  } else {
    throw new ReferenceError("No such id in database");
  }
}

async function updateCarById(id, car) {
  const data = await read();

  if (data.hasOwnProperty(id)) {
  data[id]= car;
    await write(data)
  } else {
    throw new ReferenceError("No such id in database");
  }
}

function nextId() {
  return "xxxxxxxx".replace(/x/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  );
}
module.exports = () => (req, res, next) => {
  req.storage = {
    getAllCars,
    getCarById,
    createCar,
    updateCarById,
    deleteCarById
  };
  next();
};
