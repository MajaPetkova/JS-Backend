const router = require("express").Router();
const { isUser } = require("../middleware/guards");
const preload = require("../middleware/preload");
const { getAllCourses } = require("../services/courseService");

router.get("/", async(req, res) => {
  //   console.log(req.session)
  //sort
  const courses= await getAllCourses()
  res.render("home", { title: "Tutorials Page", courses });
});

router.get("/catalog", isUser(), async(req, res) => {
  const courses= await getAllCourses()
  res.render("catalog", { title: "Catalog Page", courses });
});
router.get("/catalog/:id",preload(true), (req, res)=>{
  // console.log(res.locals.course)
  if(req.session.user){
    res.locals.course.hasUser= true;
    res.locals.course.isOwner= req.session.user._id == res.locals.course.owner._id
  }
res.render("details", {title:"Details Page"})
})
module.exports = router;
