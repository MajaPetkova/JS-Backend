const router = require("express").Router();
const { isUser, isGuest } = require("../middleware/guards");
const { register, login } = require("../services/authService");
const mapErrors = require("../util/mapper");

router.get("/register", isGuest(), (req, res) => {
  res.render("register");
});


router.post("/register",isGuest(), async (req, res) => {
  try {
    if(req.body.password.trim() == ""){
      throw new Error("Password is required!");
    }
    if (req.body.password != req.body.repass) {
      throw new Error("Passwords don't match");
    }
    const user = await register(req.body.email, req.body.firstName, req.body.lastName, req.body.password);
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error(err);
     const errors= mapErrors(err)
    res.render("register", { data: {email:req.body.email, firstName:req.body.firstName, lastName:req.body.lastName }, errors});
  }
});

router.get("/login",isGuest(), (req, res) => {
  res.render("login");
});

router.post("/login",isGuest(), async (req, res) => {
  // console.log(req.body.email, req.body.password)
  try {
    const user = await login(req.body.email, req.body.password);

    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    const errors= mapErrors(err)
    res.render("login", { data: { email: req.body.email }, errors});
  }
});


router.get("/logout", isUser(), (req, res)=>{
  delete req.session.user;
  res.redirect("/")
})
module.exports = router;
