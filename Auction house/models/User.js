const { Schema, model } = require("mongoose");
const EMAIL_PATTERN= /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;


const userSchema = new Schema({
  email: { type: String, required: true, validate: {
    validator(value){
    return EMAIL_PATTERN.test(value)
    },
    message: "Email must be valid"
  } },
  firstName: { type: String, required: true, minLength: [1, "First name must be at least 1 character long"] },
  lastName: { type: String, required: true,  minLength: [1, "Last name must be at least 1 character long"] },
  hashedPassword: { type: String, required: true },
});

userSchema.index({ email: 1 },
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
