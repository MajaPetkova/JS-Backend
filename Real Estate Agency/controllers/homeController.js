const router = require("express").Router();


router.get("/", (req, res)=>{
    // console.log(req.session);
    res.render("home", {title: "Home Page"})
})

module.exports= router;