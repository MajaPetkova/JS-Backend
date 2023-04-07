const router = require("express").Router();
const { isUser } = require("../middleware/guards");
const { createCourse } = require("../services/courseService");
const mapErrors = require("../util/mapper");


router.get("/course/create", isUser(), (req, res) => {
    res.render("create", {title:"Create Course", data:{}});
  });
  router.post("/course/create", isUser(), async(req, res) => {
    console.log(req.body)
    const course={
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      duration: req.body.duration,
      // createdAt: req.body.,
      owner: req.session.user._id
    }
    try{
      await createCourse(course)
      res.redirect("/")
    }catch(err){
      console.error(err);
      // TODO Send error messages
      const errors= mapErrors(err)
      res.render("create", {title:"Create Course", data: course, errors});
    }
  });


module.exports= router;