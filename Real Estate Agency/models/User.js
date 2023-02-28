const { Schema, model } = require("mongoose");
 const NAME_PATTERN= /([A-Za-z]+)\s([A-Za-z]+)/gm;


const userSchema = new Schema({
  name:{type: String, required: true, validate: {
    validator(value){
      return NAME_PATTERN.test(value)
    },
    message: "Name must contains First and Last name"
  }},
  username: { type: String, required: true, minLength:[5, "Username must be 5 letters long"]  },
  hashedPassword: { type: String, required: true},
});
userSchema.index(
  { username: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", userSchema);
module.exports = User;
