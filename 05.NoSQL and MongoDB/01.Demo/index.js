const mongoose = require("mongoose");
const Car = require("./models/Car");
const connectionString = "mongodb://localhost:27017/testdb";


start();
async function start() {
  await mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Database connected");
//   try {
//     const car = new Car({
//       name: "O",
//       price: -2500,
//     });
//     await car.save(); // writing data
//   } catch (err) {
//     console.log(err.message);
//     console.log(err.errors)
//   }

    const data = await Car.find({}); // reading data
    console.log(data);
    data.forEach((c) => c.startEngine());
    data.forEach((c) => console.log(c.VAT));
}
