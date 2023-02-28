const User = require("../models/User");
const { hash, compare } = require("bcrypt");

async function register(email, firstName, lastName, password) {
  const existing = await getUserByEmail(email);

  if (existing) {
    throw new Error("Username is taken");
  }

  const hashedPassword = await hash(password, 10);
  const user = new User({
    email,
    firstName,
    lastName,
    hashedPassword,
  });
  await user.save();
  return user;
}


async function login(email, password) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("User doesn't exist");
  }
  const hasMatch = await compare(password, user.hashedPassword);

  if (!hasMatch) {
    throw new Error("Incorrect email or password");
  }
  return user;
}


async function getUserByEmail(email) {
  const user = await User.findOne({
    email: new RegExp(`^${email}$`, "i"),
  });
  return user;
}

module.exports = {
  register,
  login,
};
