// // routes/blog.js
// const express = require("express");
// const Post = require("./model/Post.js")

// const router = express.Router();

// // List published posts (with pagination)
// router.get("/", async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = 10;
//   const posts = await Post.find({ status: "published" })
//     .sort({ publishedAt: -1 })
//     .skip((page - 1) * limit)
//     .limit(limit)
//     .select("-content"); // exclude full content from list view
//   res.json(posts);
// });

// // Single post by slug
// router.get("/:slug", async (req, res) => {
//   const post = await Post.findOne({ slug: req.params.slug, status: "published" });
//   if (!post) return res.status(404).json({ error: "Post not found" });
//   res.json(post);
// });


// export default router;


const express = require("express");
const router  = express.Router();
const { posts } = require("../data/posts");

// GET /api/blog — published posts, newest first
router.get("/", (req, res) => {
  const published = posts
    .filter((p) => p.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  res.json(published);
});

// GET /api/blog/:slug — single published post
router.get("/:slug", (req, res) => {
  const post = posts.find(
    (p) => p.slug === req.params.slug && p.status === "published"
  );
  if (!post) return res.status(404).json({ error: "Post not found." });
  res.json(post);
});

module.exports = router;