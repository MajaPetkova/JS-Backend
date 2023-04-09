const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, maxLength: [50, 'Description must have maximum 50 characters'] },
  imageUrl: { type: String, required: true },
  duration: { type: String, required: true },
  createdAt: { type: String,  },
  usersEnrolled: { type: [ObjectId], ref: "User", default: [] },
  owner: {type:ObjectId , ref: "User", required :true }
});

const Course = model("Course", courseSchema);
module.exports = Course;
