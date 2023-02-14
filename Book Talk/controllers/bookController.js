const { isUser } = require("../middleware/guards");

const router = require("express").Router();

router.get("/create", isUser(), (req, res)=>{
    res.render("create", {title: "Create Page"})
})
router.post("/create",  (req, res)=>{
    
    res.render("create", {title: "Create Page"})
})




module.exports= router;
