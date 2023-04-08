const Course = require("../models/Course");

async function getAllCourses (){
    return Course.find({}).lean();
}
async function createCourse (course){
   const result= new Course(course);
   await result.save();
}
async function getCourseById(id){
    return Course.findById(id).lean();
}
async function getCourseByIdAndUsers(id){
    return Course.findById(id).populate("owner").populate("usersEnrolled").lean();
}

module.exports = {
    createCourse,
    getCourseById,
    getAllCourses,
    getCourseByIdAndUsers
}