const Course = require("../models/Course");

async function createCourse (course){
   const result= new Course(course);
   await result.save();
}
async function getCourseById(id){
    return Course.findById(id);
}

module.exports = {
    createCourse,
    getCourseById,
}