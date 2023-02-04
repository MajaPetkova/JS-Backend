const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/testdb";

start();
async function start() {
  await mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    UseNewUrlParser: true,
  });
  console.log("Database connected");

  const carSchema = new mongoose.Schema({
    name: String,
    price: Number,
  });

  const Car = mongoose.model("Car", carSchema);

  const car = new Car({
    name: "VW Golf 3",
    price: 3200,
  });
  await car.save();

  const data = await Car.find({});
  console.log(data);
}
