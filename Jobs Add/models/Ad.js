const { Schema, model, Types:{ObjectId} } = require("mongoose");


// TODO add validation
const userSchema = new Schema({
  headline: { type: String, required: true },
  location: { type: String, required: true },
  companyName: {type:String, required:true },
  companyDescription: {type:String, required:true },
  owner :{type: ObjectId, ref: "User"},
  users:{type:[ObjectId] , ref: "User", default:[]}
});

const Ad = model("Ad", userSchema);
module.exports = Ad;