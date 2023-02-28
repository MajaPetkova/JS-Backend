const { Schema, model } = require("mongoose");

// TODO add validation
const userSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
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
