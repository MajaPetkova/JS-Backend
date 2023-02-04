const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/testdb";

const carSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength:[3, "Name must be longer then 3 letters"] },
  price: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "Price must be positive number",
    },
  },
});

carSchema.methods.startEngine = function () {
  console.log(`${this.name} goes vroom!`);
};
carSchema.virtual("VAT").get(function () {
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
  try {
    const car = new Car({
      name: "O",
      price: -2500,
    });
    await car.save(); // writing data
  } catch (err) {
    console.log(err.message);
    console.log(err.errors)
  }

  //   const data = await Car.find({}); // reading data
  //   console.log(data);
  //   data.forEach((c) => c.startEngine());
  //   data.forEach((c) => console.log(c.VAT));
}
