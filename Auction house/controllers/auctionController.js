const router = require("express").Router();
const { isUser } = require("../middleware/guards");


router.get("/create",isUser(), (req, res)=>{
    res.render("create", {title: "Create Page"})
})
router.post("/create",isUser(), (req, res)=>{
    console.log(req.body)
    res.redirect("/")
})




module.exports = router;
