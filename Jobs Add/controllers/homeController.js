const router = require("express").Router();
router.get("/", (req, res)=>{
    console.log(req.session)
    res.render("home")
});

module.exports = router;