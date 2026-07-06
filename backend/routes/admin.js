const express = require("express");
const prisma = require("../db/db");
const requireAuth = require("../middleware/requireAuth");
const { generateBlogPost } = require("../services/claudeServices");

const router = express.Router();

// All admin routes require a valid session
router.use(requireAuth);

// ── Helper: map DB row → API shape ────────────────────────────────────────────
function toPost(row) {
  return {
    id:              row.id,
    slug:            row.slug,
    title:           row.title,
    excerpt:         row.excerpt,
    content:         row.content,
    tags:            row.tags,
    authorName:      row.authorName,
    author:          row.authorType,
    status:          row.status,
    readingMinutes:  row.readingMinutes,
    metaDescription: row.metaDescription,
    createdAt:       row.createdAt,
    publishedAt:     row.publishedAt,
  };
}
function wordCount(str) {
  return str.trim() ? str.trim().split(/\s+/).length : 0;
}

// ── GET /api/admin/posts
router.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  res.json(posts.map(toPost));
});
// ── POST /api/admin/posts
router.post("/posts", async (req, res) => {
  const {
    title,
    slug,
    excerpt,
    content,
    tags,
    authorName,
    status,
    metaDescription,
    author,
  } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      slug,
      excerpt: excerpt || "",
      content,
      tags: tags || [],
      authorName: authorName || "Akountin Professionals",
      authorType: author || "editor",
      status: status || "draft",
      readingMinutes: Math.max(
        1,
        Math.round(content.split(/\s+/).length / 200),
      ),
      metaDescription: metaDescription || "",
      publishedAt: status === "published" ? new Date() : null,
    },
  });
  res.status(201).json(toPost(post));
});

// ── PATCH /api/admin/posts/:id
router.patch("/posts/:id", async (req, res) => {
  const {
    title,
    slug,
    excerpt,
    content,
    tags,
    authorName,
    status,
    metaDescription,
  } = req.body;
  const post = await prisma.post.update({
    where: { id: req.params.id },
    data: {
      ...(title && { title }),
      ...(slug && { slug }),
      ...(excerpt && { excerpt }),
      ...(content && {
        content,
        readingMinutes: Math.max(
          1,
          Math.round(content.split(/\s+/).length / 200),
        ),
      }),
      ...(tags && { tags }),
      ...(authorName && { metaDescription }),
      ...(status && {
        status,
        publishedAt: status === "published" ? new Date() : null,
      }),
    },
  });
  res.json(toPost(post));
});

// ── DELETE /api/admin/posts/:id  
router.delete("/posts/:id", async (req, res) => {
  await prisma.post.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

// ── POST /api/admin/generate  
router.post("/generate", async (req, res) => {
  const { topic, keywords = [], tone = "professional" } = req.body;
  if (!topic) return res.status(400).json({ error: "topic is required." });

  try {
    const generated = await generateBlogPost({ topic, keywords, tone });

    // Ensure slug is unique in DB
    const { rows } = await pool.query("SELECT id FROM posts WHERE slug = $1", [
      generated.slug,
    ]);
    if (rows.length) {
      generated.slug = `${generated.slug}-${Date.now().toString(36)}`;
    }

    res.json({ ...generated, author: "ai" });
  } catch (err) {
    console.error("Claude generation error:", err);
    res
      .status(500)
      .json({ error: "Generation failed. Check your ANTHROPIC_API_KEY." });
  }
});

module.exports = router;
