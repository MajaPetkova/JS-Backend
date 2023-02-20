const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, require: true, minLength:[3, "Username is required"] },
  hashedPassword: { type: String, required: true },
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
