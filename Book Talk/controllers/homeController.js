const router = require("express").Router();


router.get("/", (req, res)=>{
    // console.log(req.session)
    res.render("home", {title: "Home Page"})
})
router.get("/catalog", (req, res)=>{
    // console.log(req.session)
    res.render("catalog", {title: "Catalog Page"})
})

module.exports= router;
