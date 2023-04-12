const User = require("../models/User");
const { hash, compare } = require("bcrypt");

// TODO add all fields required by the exam
async function register(email, password, skills) {
  const existing = await getUserByEmail(email);

  if (existing) {
    throw new Error("Username is taken");
  }

  const hashedPassword = await hash(password, 10);
  const user = new User({
    email,
    hashedPassword,
    skills
  });
  await user.save();
  return user;
}

// TODO change identifier
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

// TODO identify user by given identifier
async function getUserByEmail(email) {
  const user = await User.findOne({ email : new RegExp(`^${email}$`, "i") });
  return user;
}

module.exports= {
    register,
    login
}