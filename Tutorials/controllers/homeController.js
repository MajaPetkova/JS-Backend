const router = require("express").Router();
const { isUser } = require("../middleware/guards");
const { getAllCourses } = require("../services/courseService");

router.get("/", (req, res) => {
  //   console.log(req.session)
  res.render("home", { title: "Tutorials Page" });
});

router.get("/catalog", isUser(), async(req, res) => {
  const courses= await getAllCourses()
  res.render("catalog", { title: "Catalog Page", courses });
});

module.exports = router;
