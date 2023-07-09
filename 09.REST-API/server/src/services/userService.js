const User = require("../model/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "hfghjglgnfdmgidfgjdfngmbw.,mbja/nqww";
const blackList = new Set();


async function register(email, password) {
  const existing = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

  if (existing) {
    throw new Error("Email is taken");
  }

  const hashedPassword = await bcrypt.hashSync(password, 10);
  const user = new User({ email, hashedPassword });
  await user.save();

  return createSession(user);
}

async function login(email, password) {
  const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });
  if (!user) {
    throw new Error("Incorrect Email or Password");
  }
  const match = await bcrypt.compare(password, user.hashedPassword);
  if (!match) {
    throw new Error("Incorrect Email or Password");
  }
  return createSession(user);
}
function logout(token){
  blackList.add(token)
}

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

function validateToken(token){
    if(blackList.has(token)){
        throw new Error("Token is blacklisted")
    }
return jwt.verify(token, JWT_SECRET)
}

module.exports = {
  register,
  login,
  logout,
  validateToken
};
