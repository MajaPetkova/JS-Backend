const Course = require("../models/Course");

async function getAllCourses(search = "") {
  return Course.find({title: { $regex: new RegExp(search, 'i') }}).lean();
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
async function enrollCourse(courseId, userId){
const course=await Course.findById(courseId);
if(course.usersEnrolled.includes (userId)){
  throw new Error("User is already on the list")
}
course.usersEnrolled.push(userId);
await course.save()
}
// async function searchCourse(name){
//     await Course.find({title: {$regex:name, $options: "i"}})
// }
module.exports = {
  createCourse,
  getCourseById,
  getAllCourses,
  getCourseByIdAndUsers,
  editCourse,
  deleteCourse,
  enrollCourse
  // searchCourse
};
