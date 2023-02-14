const { Schema, model } = require("mongoose");

// TODO change user model according to exam description
// TODO add validation
// const NAME_PATTERN= /^[a-zA-Z]+$/;
const email_pattern= /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
const userSchema = new Schema({
  email: { type: String, required: true,  minLength:[10, "Email must be at least 10 characters long"], 
  validate:{
    validator(value){
    return email_pattern.test(value)
    }, 
    message: "Email must be valid and contain only english letters"
  } 
},
  username:  { type: String,  minLength:[4, "Username must be at least 4 characters long"]},
  hashedPassword: { type: String, required: true, minLength:[3, "Password must be at least 3 characters long"] },
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
