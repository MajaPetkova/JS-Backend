const mongoose = require("mongoose");

const Post = require("./models/Post");
const Comment = require("./models/Comment");
const connectionString = "mongodb://localhost:27017/testdb";

start();
async function start() {
  await mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Database connected");


     //create Post
//   await Post.create({
//     author: "Peter",
//     title: "My first post",
//     content : "Lorem ipsus dolor sit Amet"
//   });

     // Create comment
// await Comment.create({
//     author: "John",
//     content: "Nice Article"
// });

// const comment=await Comment.findOne({});

const post = await Post.findOne({}).populate("comments", "content");
// post.comments.push(comment);
// await post.save();
console.log(post);
//delete all comments
Comment.deleteMany({post: post._id})
}
