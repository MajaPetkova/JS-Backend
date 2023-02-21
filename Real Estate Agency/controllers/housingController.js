const router= require("express").Router();
const { isUser } = require("../middleware/guards");


router.get("/create",isUser(), (req, res)=>{
res.render("create")
});

router.post("/create",isUser(), (req, res)=>{
    console.log(req.body)
    res.redirect("/catalog")
});




module.exports= router;