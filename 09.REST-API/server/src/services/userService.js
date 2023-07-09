const User = require("../model/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "hfghjglgnfdmgidfgjdfngmbw.,mbja/nqww";

async function register(email, password) {
  const existing = await User.find({ email: new RegExp(`^${email}$`, "i") });

  if (existing) {
    throw new Error("Email is taken");
  }

  const hashedPassword = await bcrypt.hashSync(password, 10);
  const user = new User({ email, hashedPassword });
  await user.save();

  return createSession(user);
}

async function login(email, password) {}

function createSession(user) {
  const payload = {
    email: user.email,
    _id: user.id,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET);
  
  return {
    email: user.email,
    accessToken,
    _id: user.id,
  };
}

module.exports = {
  register,
  login,
};
