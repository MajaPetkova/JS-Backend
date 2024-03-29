 const { validationResult } = require("express-validator");

  module.exports = {
  registerGet(req, res) {
    res.render("register", { title: "Register" });
  },

  async registerPost(req, res) {
   const {errors} =  validationResult(req);
    // if (req.body.username == "" || req.body.password == "") {
    //   return res.redirect("/register");
    // }
    // if (req.body.password != req.body.repeatPassword) {
    //   return res.redirect("/register");
    // }
        try {
      if(errors.length > 0){
        throw errors;
      }
      await req.auth.register(req.body.username, req.body.password);
      //  console.log(req.body)
      res.redirect("/");
    } catch (errors) {
      console.error(errors);
         res.render("register",{ title: "Register" , errors, data:{username: req.body.username} });
    }
  },
  loginGet(req, res) {
    res.render("login", { title: "Login" });
  },
  async loginPost(req, res) {
    try {
      await req.auth.login(req.body.username, req.body.password)
      res.redirect("/");
    } catch (err) {
      res.locals.errors= [{msg: err.message}]
      console.error(err.message);
      res.render("login", { title: "Login"} );
    }

  },
  logoutGet(req, res) {
    req.auth.logout();
    res.redirect("/")
  },
};
