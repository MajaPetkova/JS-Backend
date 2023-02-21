const router = require("express").Router();
const { isUser, isGuest } = require("../middleware/guards");
const { register, login } = require("../services/authService");
const mapError = require("../util/mapper");

router.get("/register", isGuest(), (req, res) => {
  res.render("register");
});

router.post("/register", isGuest(), async (req, res) => {
  try {
    if (req.body.password.trim() == ""){
        throw new Error("Password is required");
    }
      if (req.body.password != req.body.repass) {
        throw new Error("Passwords don't match");
      }
    const user = await register(req.body.name, req.body.username, req.body.password);
    // console.log(user);
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    const errors = mapError(err);
    res.render("register", { data: { username: req.body.username, name:req.body.name }, errors });
  }
});

router.get("/login", isGuest(), (req, res) => {
  res.render("login");
});

router.post("/login", isGuest(), async (req, res) => {
  try {
    const user = await login(req.body.username, req.body.password);
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    const errors = mapError(err);
    res.render("login", { data: { username: req.body.username }, errors });
  }
});

router.get("/logout", isUser(), (req, res) => {
  delete req.session.user;
  res.redirect("/");
});
module.exports = router;
