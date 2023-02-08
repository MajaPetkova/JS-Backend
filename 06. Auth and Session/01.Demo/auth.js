const bcrypt= require("bcrypt")

module.exports = () => {
  const users = {
    peter: {
      username: "peter",
      password: "123",
    },
    john: {
      username: "john",
      password: "123",
    },
  };
  return (req, res, next) => {
    req.auth = {
      login,
      register,
    };
    next();

    function login(username, password) {
      const user = users[username];

      if (user && password == user.password) {
        console.log("successful login");
        req.session.user = user;
        return true;
      } else {
        return false;
      }
      //   console.log(req.session);
      //   console.log(req.body);
    }
    function register(username, password) {
      if (users[username] != undefined) {
        return false;
      } else {
        const user = {
          username: username,
          password: password,
        };
        users[username] = user;
        console.log("successful register " + username);
        return true;
      }
    }
  };
};
