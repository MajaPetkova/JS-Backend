const bcrypt = require("bcrypt");

module.exports = () => {
  const users = {
    // "4587fd51": { id: "4587fd51", username: "peter", password: "123" },
  };
  return (req, res, next) => {
    req.auth = {
      login,
      register,
    };
    next();

    async function login(username, password) {
      const user = Object.values(users).find((u) => u.username == username);
      
      if (user && await bcrypt.compare(password, user.hashedPassword)){
          console.log("successful login "  + username);
          req.session.user = user;
        return true;
      } else {
        return false;
      }
      //   console.log(req.session);
      //   console.log(req.body);
    }
    async function register(username, password) {
      if (Object.values(users).find((u) => u.username == username) != undefined) {
        return false;
      } else {
        const id = `xxxxxxxx`.replace(/x/g, () =>
          ((Math.random() * 16) | 0).toString(16)
        );
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
          id,
          username: username,
          hashedPassword,
        };
        users[id] = user;
        console.log("successful register " + username);
        return true;
      }
    }
  };
};
