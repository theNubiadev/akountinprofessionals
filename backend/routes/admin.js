const express              = require("express");
const { randomUUID }       = require("crypto");
const requireAuth          = require("../middleware/requireAuth");
const { generateBlogPost } = require("../services/claudeServices");

const router = express.Router();

// ── Temporary in-memory store (replace with PostgreSQL later) 
const posts = [
  {
    id:              randomUUID(),
    slug:            "understanding-self-assessment-deadlines-2024-25",
    title:           "Understanding the 2024–25 Self-Assessment Deadlines",
    excerpt:         "Miss the 31 January deadline and HMRC issues automatic penalties.",
    content:         "**Overview**\n\nEvery year, millions of UK taxpayers must file a Self Assessment return.",
    tags:            ["Self Assessment", "HMRC", "Tax Deadlines"],
    authorName:      "Sarah Williams",
    author:          "editor",
    status:          "published",
    readingMinutes:  4,
    metaDescription: "Key self-assessment deadlines for the 2024-25 tax year.",
    createdAt:       new Date(Date.now() - 86400000 * 5).toISOString(),
    publishedAt:     new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id:              randomUUID(),
    slug:            "corporation-tax-changes-small-business-2023",
    title:           "Corporation Tax Changes: What Small Businesses Must Know",
    excerpt:         "The main rate rose to 25% for profits over £250,000.",
    content:         "**The new rate structure**\n\nFrom April 2023, the UK Corporation Tax landscape changed significantly.",
    tags:            ["Corporation Tax", "Limited Company", "Tax Planning"],
    authorName:      "Sarah Williams",
    author:          "editor",
    status:          "draft",
    readingMinutes:  3,
    metaDescription: "Corporation Tax changes from April 2023 explained.",
    createdAt:       new Date(Date.now() - 86400000 * 2).toISOString(),
    publishedAt:     null,
  },
];

// All admin routes require a valid session
router.use(requireAuth);

function wordCount(str) {
  return str.trim() ? str.trim().split(/\s+/).length : 0;
}

// ── GET /api/admin/posts 
router.get("/posts", (req, res) => {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json(sorted);
});

// ── POST /api/admin/posts 
router.post("/posts", (req, res) => {
  const {
    title, slug, excerpt = "", content,
    tags = [], authorName, status = "draft",
    metaDescription = "", author = "editor",
  } = req.body;

  if (!title || !slug || !content) {
    return res.status(400).json({ error: "title, slug and content are required." });
  }
  if (posts.find((p) => p.slug === slug)) {
    return res.status(409).json({ error: "A post with that slug already exists." });
  }

  const post = {
    id:              randomUUID(),
    slug,
    title,
    excerpt,
    content,
    tags:            Array.isArray(tags) ? tags : [],
    authorName:      authorName || "Akountin Professionals",
    author,
    status,
    readingMinutes:  Math.max(1, Math.round(wordCount(content) / 200)),
    metaDescription,
    createdAt:       new Date().toISOString(),
    publishedAt:     status === "published" ? new Date().toISOString() : null,
  };

  posts.unshift(post);
  res.status(201).json(post);
});

// ── PATCH /api/admin/posts/:id ────────────────────────────────────────────────
router.patch("/posts/:id", (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Post not found." });

  const updated = { ...posts[idx], ...req.body };

  if (req.body.content) {
    updated.readingMinutes = Math.max(1, Math.round(wordCount(req.body.content) / 200));
  }
  if (req.body.status === "published" && !posts[idx].publishedAt) {
    updated.publishedAt = new Date().toISOString();
  }
  if (req.body.status === "draft") {
    updated.publishedAt = null;
  }

  posts[idx] = updated;
  res.json(updated);
});

// ── DELETE /api/admin/posts/:id ───────────────────────────────────────────────
router.delete("/posts/:id", (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Post not found." });
  posts.splice(idx, 1);
  res.json({ ok: true });
});

// ── POST /api/admin/generate ──────────────────────────────────────────────────
router.post("/generate", async (req, res) => {
  const { topic, keywords = [], tone = "professional" } = req.body;
  if (!topic) return res.status(400).json({ error: "topic is required." });

  try {
    const generated = await generateBlogPost({ topic, keywords, tone });

    // Ensure slug is unique
    if (posts.find((p) => p.slug === generated.slug)) {
      generated.slug = `${generated.slug}-${Date.now().toString(36)}`;
    }

    res.json({ ...generated, author: "ai" });
  } catch (err) {
    console.error("Claude generation error:", err);
    res.status(500).json({ error: "Generation failed. Check your ANTHROPIC_API_KEY." });
  }
});

module.exports = router;