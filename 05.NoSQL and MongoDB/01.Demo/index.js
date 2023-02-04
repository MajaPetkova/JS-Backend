const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/testdb";


const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
});

carSchema.methods.startEngine = function(){
    console.log(`${this.name} goes vroom!`)
}
carSchema.virtual("VAT").get(function(){
    return this.price * 0.2;
});
const Car = mongoose.model("Car", carSchema);

start();
async function start() {
  await mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Database connected");

//   const car = new Car({
//     name: "VW Golf 3",
//     // price: 3200,
//   });
//   await car.save(); // writing data

  const data = await Car.find({}); // reading data
  console.log(data);
  data.forEach(c=> c.startEngine());
  data.forEach(c=> console.log(c.VAT));
}
