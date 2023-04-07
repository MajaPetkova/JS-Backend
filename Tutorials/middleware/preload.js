
const courseService = require ("../services/courseService")

function preload() {
  return async function (req, res, next) {
    const id = req.params.id;
   
    
    if (populate) {
      res.locals.course = await courseService.getCourseAndUsers(id);
    } else {
      res.locals.course = await courseService.getCourseById(id);
    }

    next();
  };
}
module.exports = preload;
