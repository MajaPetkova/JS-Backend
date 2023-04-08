const Course = require("../models/Course");

async function getAllCourses() {
  return Course.find({}).lean();
}
async function createCourse(course) {
  const result = new Course(course);
  await result.save();
}
async function getCourseById(id) {
  return Course.findById(id).lean();
}
async function getCourseByIdAndUsers(id) {
  return Course.findById(id).populate("owner").populate("usersEnrolled").lean();
}
async function editCourse(id, course) {
  const existing = await Course.findById(id);

  existing.title = course.title;
  existing.description = course.description;
  existing.imageUrl = course.imageUrl;
  existing.duration = course.duration;
  await existing.save();
}

async function deleteCourse(id){
  await Course.findByIdAndDelete(id)
}

module.exports = {
  createCourse,
  getCourseById,
  getAllCourses,
  getCourseByIdAndUsers,
  editCourse,
  deleteCourse
};
