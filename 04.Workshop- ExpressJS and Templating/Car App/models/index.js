const mongoose = require("mongoose");
 require("./Car");
 require("./Accessories");
 
const connectionString = "mongodb://localhost:27017/carbicle";

async function init() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false
    });
    console.log("Database connected");

//    await Car.create({
//       name: "Toyota Avensis 1.6i",
//       description:
//         "Imported from Denmark. 203 000 km with full service history. No blemishes on the paint. Petrol engine.",
//       imageUrl:
//         "https://assets.adac.de/image/upload/w_898/Autodatenbank/GWInfo/gw0214-toyota-avensis-2003-2009.jpg",
//       price: "3587",
//     });
    mongoose.connection.on("error", (err) => {
      console.error("Database Error");
      console.error(err);
    });
  } catch (err) {
    console.error("Error connecting to database");
    process.exit(1);
  }
}
module.exports = init;
