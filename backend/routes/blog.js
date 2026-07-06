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



// const express = require("express");
// const router  = express.Router();
// const { posts } = require("../data/posts");

// // GET /api/blog — published posts, newest first
// router.get("/", (req, res) => {
//   const published = posts
//     .filter((p) => p.status === "published")
//     .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
//   res.json(published);
// });

// // GET /api/blog/:slug — single published post
// router.get("/:slug", (req, res) => {
//   const post = posts.find(
//     (p) => p.slug === req.params.slug && p.status === "published"
//   );
//   if (!post) return res.status(404).json({ error: "Post not found." });
//   res.json(post);
// });

// module.exports = router;


const express = require("express");
const pool    = require("../db/db");

const router = express.Router();

function toPost(row) {
  return {
    id:              row.id,
    slug:            row.slug,
    title:           row.title,
    excerpt:         row.excerpt,
    content:         row.content,
    tags:            row.tags,
    authorName:      row.author_name,
    author:          row.author_type,
    status:          row.status,
    readingMinutes:  row.reading_minutes,
    metaDescription: row.meta_description,
    createdAt:       row.created_at,
    publishedAt:     row.published_at,
  };
}

// ── GET /api/blog — all published posts, newest first ─────────────────────────
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC"
    );
    res.json(rows.map(toPost));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

// ── GET /api/blog/:slug — single published post ───────────────────────────────
router.get("/:slug", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM posts WHERE slug = $1 AND status = 'published'",
      [req.params.slug]
    );
    if (!rows[0]) return res.status(404).json({ error: "Post not found." });
    res.json(toPost(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch post." });
  }
});

module.exports = router;