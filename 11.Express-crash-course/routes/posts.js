const express = require("express");
const router = express.Router();

let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

//get all posts
router.get("/", (req, res) => {
  //   res.json(posts);
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});
//get a single posts
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //   res.status(200).json(posts.filter((x) => x.id === id));
  const post = posts.find((x) => x.id === id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json(post);
});

module.exports = router;
