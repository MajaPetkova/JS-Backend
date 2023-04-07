const User = require("../models/User");
const { hash, compare } = require("bcrypt");


async function register(username, password) {
  const existing = await getUserByUserName(username);

  if (existing) {
    throw new Error("Username is taken");
  }

  const hashedPassword = await hash(password, 10);
  const user = new User({
    username,
    hashedPassword,
  });
  await user.save();
  return user;
}


async function login(username, password) {
  const user = await getUserByUserName(username);

  if (!user) {
    throw new Error("User doesn\'t exist");
  }
  const hasMatch= await compare(password, user.hashedPassword);

  if(!hasMatch){
    throw new Error("Incorrect username or password");
  };
  return user;
}

async function getUserByUserName(username) {
  const user = await User.findOne({ username : new RegExp(`^${username}$`, "i") });
  return user;
}

module.exports= {
    register,
    login
}
