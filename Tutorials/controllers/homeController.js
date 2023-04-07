const router = require("express").Router();
const { isUser } = require("../middleware/guards");

router.get("/", (req, res) => {
  //   console.log(req.session)
  res.render("home", { title: "Tutorials Page" });
});

router.get("/catalog", isUser(), (req, res) => {
  res.render("catalog", { title: "Catalog Page" });
});

module.exports = router;
