 const express = require("express");
const prisma    = require("../db/db");

const router = express.Router();

function toPost(row) {
  // blog
  return {
    id:              row.id,
    slug:            row.slug,
    title:           row.title,
    excerpt:         row.excerpt,
    content:         row.content,
    tags:            row.tags,
    authorName:     row.authorName,
    author:          row.author_type,
    status:          row.status,
    readingMinutes:  row.reading_minutes,
    metaDescription: row.meta_description,
    createdAt:       row.created_at,
    publishedAt:     row.published_at,
  };
}

// ── GET /api/blog — all published posts, newest first 
router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" }
  });
  res.json(posts.map(toPost));
});

// ── GET /api/blog/:slug — single published post 
 router.get("/:slug", async (req, res) => {
  const post = await prisma.post.findFirst({
    where: { slug: req.params.slug, status: "published" }
  });
  if (!post) return res.status(404).json({ error: "Post not found." });
  res.json(toPost(post));
});
module.exports = router;