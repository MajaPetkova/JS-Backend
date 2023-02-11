module.exports = {
  registerGet(req, res) {
    res.render("register", { title: "Register" });
  },

  async registerPost(req, res) {
    if (req.body.username == "" || req.body.password == "") {
      return res.redirect("/register");
    }
    if (req.body.password != req.body.repeatPassword) {
      return res.redirect("/register");
    }
    try {
      await req.auth.register(req.body.username, req.body.password);
      //  console.log(req.body)
      res.redirect("/");
    } catch (err) {
      console.error(err.message);
      res.redirect("/register");
    }
  },
  loginGet(req, res) {
    res.render("login", { title: "Login" });
  },
  loginPost(req, res) {
    console.log(req.body);
    res.redirect("/");
  },
  logoutGet(req, res) {},
};
