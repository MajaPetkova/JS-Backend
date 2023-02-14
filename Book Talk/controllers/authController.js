const { isUser, isGuest } = require("../middleware/guards");
const { register, login } = require("../services/authService");
const {mapErrors} = require("../util/mapper");
const router = require("express").Router();

router.get("/register", isGuest(), (req, res) => {
  res.render("register", {title: "Register Page"});
});

// TODO check form actions methods field names
router.post("/register",isGuest(), async (req, res) => {
  try {
    if(req.body.password.trim() == ""){
      throw new Error("Password is required");
    }else if (req.body.password != req.body.repass) {
      throw new Error("Passwords don't match");
    }
    const user = await register(req.body.email, req.body.username, req.body.password);
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error(err);
     // TODO Send error messages
     const errors= mapErrors(err);
     const data= {
      email: req.body.email,
      username: req.body.username,
     }
    res.render("register", { title: "Register Page", data, errors});
  }
});

router.get("/login",isGuest(), (req, res) => {
  res.render("login" , {title: "Login Page"});
});

// TODO check form actions methods field names
router.post("/login",isGuest(), async (req, res) => {

  try {
    const user = await login(req.body.email, req.body.password);

    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    // TODO Send error messages
    const errors= mapErrors(err)
    res.render("login", {title:"Login Page", data: { email: req.body.username }, errors});
  }
});


router.get("/logout", isUser(), (req, res)=>{
  delete req.session.user;
  res.redirect("/")
})
module.exports = router;
