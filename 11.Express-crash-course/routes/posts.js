import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
const router = express.Router();


//get all posts
router.get("/", getPosts);

//get a single posts
router.get("/:id", getPost);

//create post
router.post("/", createPost);

//update post
router.put("/:id", updatePost);

// delete post
router.delete("/:id", deletePost);

export default router;
