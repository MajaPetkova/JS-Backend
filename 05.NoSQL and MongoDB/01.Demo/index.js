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

    const data = await Car.find({price : {$gt : 2500, $lt: 4000 } }); // reading data
    console.log(data);
    // data.forEach((c) => c.startEngine());
    // data.forEach((c) => console.log(c.VAT));

    await Car.findByIdAndUpdate('63de2076a4194c20ebf764e5', {price: 2099}) //update by id
   
    console.log(await Car.find({}).select("price")) // queries
    console.log(await Car.find({}).sort({price: 1}))  // sorting  -1 or 1
    // const car= await Car.findOne({}); //  findOne
    //  const car= await Car.findById('63de2076a4194c20ebf764e5');  // findById - reading;

    //  car.price= 1890; // modify data
    //  car.save();
    // console.log(car)
}
