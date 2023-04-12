const { Schema, model, Types:{ObjectId} } = require("mongoose");


// TODO add validation
const userSchema = new Schema({
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  skills: {type:String, required:true },
  myAdds :{type: [ObjectId], ref: "Ad", default:[]}
});

userSchema.index(
  { email: 1 },{
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);
const User = model("User", userSchema);
module.exports = User;
