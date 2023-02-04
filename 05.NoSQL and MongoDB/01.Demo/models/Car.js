const {Schema, model} = require("mongoose");

const carSchema = new Schema({
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

  const Car = model("Car", carSchema);
  module.exports = Car;