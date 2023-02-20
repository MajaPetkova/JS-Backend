const router = require("express").Router();
const { register, login } = require("../services/authService");
const mapError = require("../views/layouts/mapper");


router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    if(req.body)
    if (req.body.password != req.body.repass) {
      throw new Error("Passwords don't match");
    }
    const user = await register(req.body.username, req.body.password);
    // console.log(user);
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    const errors= mapError(err)
    res.render("register", { data: { username: req.body.username }, errors });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const user = await login(req.body.username, req.body.password);
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    const errors= mapError(err)
    res.render("/login", { data: { username: req.body.username }, errors });
  }
});


router.get("/logout", (req, res)=>{
delete req.session.user;
req.redirect("/")
})
module.exports = router;
