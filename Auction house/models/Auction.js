const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");


const URL_PATTERN = /https?:\/\/(.+)/;

const auctionSchema = new Schema({
  title: { type: String, required: true, minLength:[4, "Title must be at least 4 characters long"]  },
  description: { type: String, required: true , maxLength:[200, "Description must be not longer than 200 characters"]},
  category: { type: String, required: true, enum:["vehicles", "estate", "electronics", "furniture", "other"]},
  image: { type: String, required: true, validate:{
    validator (value){
      return URL_PATTERN.test(value)
    },
    message: "Image must be valid url"
     }
   },
  price: { type: Number, required: true, min: [0, "Can not be negative number"] },
  owner: { type: ObjectId, ref: 'User', required: true },
  bidder: { type: [ObjectId], ref: "User", default: [] },
});


const Auction = model("Auction", auctionSchema);

module.exports = Auction;