// const express              = require("express");
// const { randomUUID }       = require("crypto");
// const requireAuth          = require("../middleware/requireAuth");
// const { generateBlogPost } = require("../services/claudeServices");

// const router = express.Router();

// // ── Temporary in-memory store (replace with PostgreSQL later) 
// const posts = [
//   {
//     id:              randomUUID(),
//     slug:            "understanding-self-assessment-deadlines-2024-25",
//     title:           "Understanding the 2024–25 Self-Assessment Deadlines",
//     excerpt:         "Miss the 31 January deadline and HMRC issues automatic penalties.",
//     content:         "**Overview**\n\nEvery year, millions of UK taxpayers must file a Self Assessment return.",
//     tags:            ["Self Assessment", "HMRC", "Tax Deadlines"],
//     authorName:      "Sarah Williams",
//     author:          "editor",
//     status:          "published",
//     readingMinutes:  4,
//     metaDescription: "Key self-assessment deadlines for the 2024-25 tax year.",
//     createdAt:       new Date(Date.now() - 86400000 * 5).toISOString(),
//     publishedAt:     new Date(Date.now() - 86400000 * 4).toISOString(),
//   },
//   {
//     id:              randomUUID(),
//     slug:            "corporation-tax-changes-small-business-2023",
//     title:           "Corporation Tax Changes: What Small Businesses Must Know",
//     excerpt:         "The main rate rose to 25% for profits over £250,000.",
//     content:         "**The new rate structure**\n\nFrom April 2023, the UK Corporation Tax landscape changed significantly.",
//     tags:            ["Corporation Tax", "Limited Company", "Tax Planning"],
//     authorName:      "Sarah Williams",
//     author:          "editor",
//     status:          "draft",
//     readingMinutes:  3,
//     metaDescription: "Corporation Tax changes from April 2023 explained.",
//     createdAt:       new Date(Date.now() - 86400000 * 2).toISOString(),
//     publishedAt:     null,
//   },
// ];

// // All admin routes require a valid session
// router.use(requireAuth);

// function wordCount(str) {
//   return str.trim() ? str.trim().split(/\s+/).length : 0;
// }

// // ── GET /api/admin/posts 
// router.get("/posts", (req, res) => {
//   const sorted = [...posts].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );
//   res.json(sorted);
// });

// // ── POST /api/admin/posts 
// router.post("/posts", (req, res) => {
//   const {
//     title, slug, excerpt = "", content,
//     tags = [], authorName, status = "draft",
//     metaDescription = "", author = "editor",
//   } = req.body;

//   if (!title || !slug || !content) {
//     return res.status(400).json({ error: "title, slug and content are required." });
//   }
//   if (posts.find((p) => p.slug === slug)) {
//     return res.status(409).json({ error: "A post with that slug already exists." });
//   }

//   const post = {
//     id:              randomUUID(),
//     slug,
//     title,
//     excerpt,
//     content,
//     tags:            Array.isArray(tags) ? tags : [],
//     authorName:      authorName || "Akountin Professionals",
//     author,
//     status,
//     readingMinutes:  Math.max(1, Math.round(wordCount(content) / 200)),
//     metaDescription,
//     createdAt:       new Date().toISOString(),
//     publishedAt:     status === "published" ? new Date().toISOString() : null,
//   };

//   posts.unshift(post);
//   res.status(201).json(post);
// });

// // ── PATCH /api/admin/posts/:id ────────────────────────────────────────────────
// router.patch("/posts/:id", (req, res) => {
//   const idx = posts.findIndex((p) => p.id === req.params.id);
//   if (idx === -1) return res.status(404).json({ error: "Post not found." });

//   const updated = { ...posts[idx], ...req.body };

//   if (req.body.content) {
//     updated.readingMinutes = Math.max(1, Math.round(wordCount(req.body.content) / 200));
//   }
//   if (req.body.status === "published" && !posts[idx].publishedAt) {
//     updated.publishedAt = new Date().toISOString();
//   }
//   if (req.body.status === "draft") {
//     updated.publishedAt = null;
//   }

//   posts[idx] = updated;
//   res.json(updated);
// });

// // ── DELETE /api/admin/posts/:id ───────────────────────────────────────────────
// router.delete("/posts/:id", (req, res) => {
//   const idx = posts.findIndex((p) => p.id === req.params.id);
//   if (idx === -1) return res.status(404).json({ error: "Post not found." });
//   posts.splice(idx, 1);
//   res.json({ ok: true });
// });

// // ── POST /api/admin/generate ──────────────────────────────────────────────────
// router.post("/generate", async (req, res) => {
//   const { topic, keywords = [], tone = "professional" } = req.body;
//   if (!topic) return res.status(400).json({ error: "topic is required." });

//   try {
//     const generated = await generateBlogPost({ topic, keywords, tone });

//     // Ensure slug is unique
//     if (posts.find((p) => p.slug === generated.slug)) {
//       generated.slug = `${generated.slug}-${Date.now().toString(36)}`;
//     }

//     res.json({ ...generated, author: "ai" });
//   } catch (err) {
//     console.error("Claude generation error:", err);
//     res.status(500).json({ error: "Generation failed. Check your ANTHROPIC_API_KEY." });
//   }
// });

// module.exports = router;



const express              = require("express");
const pool                 = require("../db/db");
const requireAuth          = require("../middleware/requireAuth");
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
    authorName:      row.author_name,
    author:          row.author_type,
    status:          row.status,
    readingMinutes:  row.reading_minutes,
    metaDescription: row.meta_description,
    createdAt:       row.created_at,
    publishedAt:     row.published_at,
  };
}

function wordCount(str) {
  return str.trim() ? str.trim().split(/\s+/).length : 0;
}

// ── GET /api/admin/posts ──────────────────────────────────────────────────────
router.get("/posts", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    res.json(rows.map(toPost));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

// ── POST /api/admin/posts ─────────────────────────────────────────────────────
router.post("/posts", async (req, res) => {
  const {
    title, slug, excerpt = "", content,
    tags = [], authorName, status = "draft",
    metaDescription = "", author = "editor",
  } = req.body;

  if (!title || !slug || !content) {
    return res.status(400).json({ error: "title, slug and content are required." });
  }

  const mins        = Math.max(1, Math.round(wordCount(content) / 200));
  const publishedAt = status === "published" ? new Date() : null;

  try {
    const { rows } = await pool.query(
      `INSERT INTO posts
         (slug, title, excerpt, content, tags, author_name, author_type,
          status, reading_minutes, meta_description, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [slug, title, excerpt, content, tags,
       authorName || "Akountin Professionals", author,
       status, mins, metaDescription, publishedAt]
    );
    res.status(201).json(toPost(rows[0]));
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "A post with that slug already exists." });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to create post." });
  }
});

// ── PATCH /api/admin/posts/:id ────────────────────────────────────────────────
router.patch("/posts/:id", async (req, res) => {
  const {
    title, slug, excerpt, content, tags,
    authorName, status, metaDescription,
  } = req.body;

  try {
    const { rows: current } = await pool.query(
      "SELECT * FROM posts WHERE id = $1", [req.params.id]
    );
    if (!current[0]) return res.status(404).json({ error: "Post not found." });

    const old = current[0];

    const newContent   = content ?? old.content;
    const newStatus    = status  ?? old.status;
    const newPublished =
      newStatus === "published" && !old.published_at ? new Date()
      : newStatus === "draft"                        ? null
      : old.published_at;

    const { rows } = await pool.query(
      `UPDATE posts SET
         slug             = COALESCE($1, slug),
         title            = COALESCE($2, title),
         excerpt          = COALESCE($3, excerpt),
         content          = $4,
         tags             = COALESCE($5, tags),
         author_name      = COALESCE($6, author_name),
         status           = $7,
         reading_minutes  = $8,
         meta_description = COALESCE($9, meta_description),
         published_at     = $10
       WHERE id = $11
       RETURNING *`,
      [
        slug, title, excerpt,
        newContent, tags, authorName,
        newStatus,
        Math.max(1, Math.round(wordCount(newContent) / 200)),
        metaDescription, newPublished,
        req.params.id,
      ]
    );
    res.json(toPost(rows[0]));
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "A post with that slug already exists." });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to update post." });
  }
});

// ── DELETE /api/admin/posts/:id ───────────────────────────────────────────────
router.delete("/posts/:id", async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM posts WHERE id = $1", [req.params.id]
    );
    if (!rowCount) return res.status(404).json({ error: "Post not found." });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post." });
  }
});

// ── POST /api/admin/generate ──────────────────────────────────────────────────
router.post("/generate", async (req, res) => {
  const { topic, keywords = [], tone = "professional" } = req.body;
  if (!topic) return res.status(400).json({ error: "topic is required." });

  try {
    const generated = await generateBlogPost({ topic, keywords, tone });

    // Ensure slug is unique in DB
    const { rows } = await pool.query(
      "SELECT id FROM posts WHERE slug = $1", [generated.slug]
    );
    if (rows.length) {
      generated.slug = `${generated.slug}-${Date.now().toString(36)}`;
    }

    res.json({ ...generated, author: "ai" });
  } catch (err) {
    console.error("Claude generation error:", err);
    res.status(500).json({ error: "Generation failed. Check your ANTHROPIC_API_KEY." });
  }
});

module.exports = router;