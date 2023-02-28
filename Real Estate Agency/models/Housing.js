const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const IMAGE_PATTERN = /https?:\/\/(.+)/;

const housingSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [4, "Name must be 4 characters long"],
  },
  type: { type: String, required: true },
  year: { type: Number, required: true, min: 1850, max: 2021 },
  city: {
    type: String, required: true, minLength: [4, "City name must be 4 characters long"]},
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return IMAGE_PATTERN.test(value);
      },
      message: "Housing image must be valid url",
    },
  },
  description: {
    type: String,
    required: true,
    maxLength: [60, "Description must be not longer than 60 characters"],
  },
  availablePieces: { type: Number, required: true, min: 0, max: 10 },
  rentedHome: { type: [ObjectId], ref: "User", default: [] },
  owner: { type: ObjectId, ref: "User" },
});

const Housing = model("Housing", housingSchema);
module.exports = Housing;
