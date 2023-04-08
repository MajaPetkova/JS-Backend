const router = require("express").Router();
const { isUser } = require("../middleware/guards");
const preload = require("../middleware/preload");
const { getAllCourses, searchCourse } = require("../services/courseService");
const mapErrors = require("../util/mapper");

router.get("/", async (req, res) => {
  //   console.log(req.session)
  //sort
  const courses = await getAllCourses();
  res.render("home", { title: "Tutorials Page", courses });
});

router.get("/catalog", isUser(), async (req, res) => {
  const courses = await getAllCourses();
  res.render("catalog", { title: "Catalog Page", courses });
});
router.get("/catalog/:id", preload(true), isUser(), (req, res) => {
  // console.log(res.locals.course)
  const course = res.locals.course;
  if (req.session.user) {
    course.hasUser = true;
    course.isOwner = req.session.user._id == course.owner._id;

    if (course.usersEnrolled.some((x) => x._id == req.session.user._id)) {
      course.isEnrolled = true;
    }
  }
  res.render("details", { title: "Details Page" });
});

module.exports = router;
