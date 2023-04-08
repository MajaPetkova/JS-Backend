const router = require("express").Router();
const { isUser, isOwner } = require("../middleware/guards");
const preload = require("../middleware/preload");
const { createCourse, editCourse, deleteCourse, enrollCourse } = require("../services/courseService");
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

  router.get("/edit/:id",preload(), isOwner(), (req, res) => {
    res.render("edit", {title:"Edit Course", });
  });

  router.post("/edit/:id",preload(), isOwner(), async(req, res) => {
    // console.log(req.body)
    const id= req.params.id;
    const course={
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      duration: req.body.duration
    }

    try{
      await editCourse(id, course)
      res.redirect('/catalog')
    }catch(err){
      console.error(err);
      const errors= mapErrors(err);
      course._id=id;
      res.render("edit", {title:"Edit Course", course, errors});
    }
  });
  router.get("/delete/:id",preload(), isOwner(), async(req, res) => {
     await deleteCourse(req.params.id)
     res.redirect("/")
  });

  router.get("/enroll/:id",isUser(), async(req, res) => {
   const id= req.params.id;

   try{
    await enrollCourse (id, req.session.user._id)
     res.redirect("/catalog/" + id)
   }catch(err){
    console.error(err);
    // const errors= mapErrors(err);
    res.redirect("/catalog/" +id);
   }
 });
module.exports= router;