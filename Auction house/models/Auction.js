const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const auctionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  owner: { type: ObjectId, required: true, ref: "User" },
  bidder: { type: [ObjectId], ref: "User", default: [] },
});


const Auction = model("Auction", auctionSchema);

module.exports = Auction;