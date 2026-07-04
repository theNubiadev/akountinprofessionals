// // routes/admin.js

// const express = require("express");
// const   Post = require("../models/Post.js");
// const generateBlogPost = require("../services/claudeServices.js");

// const router = express.Router();

// // Generate a post with Claude (returns draft — editor reviews before publishing)
// router.post("/generate", async (req, res) => {
//   const { topic, keywords, tone } = req.body;

//   if (!topic) return res.status(400).json({ error: "Topic is required" });

//   const generated = await generateBlogPost({ topic, keywords, tone });

//   // Save as draft so editor can review/edit before publishing
//   const post = await Post.create({
//     ...generated,
//     author: "ai",
//     authorName: "AI Assistant",
//     status: "draft",
//   });

//   res.json({ message: "Draft created", post });
// });

// // Editor creates a post manually
// router.post("/posts", async (req, res) => {
//   const { title, slug, excerpt, content, tags, metaDescription, authorName } = req.body;

//   const post = await Post.create({
//     title, slug, excerpt, content, tags, metaDescription,
//     author: "editor",
//     authorName: authorName || "The Team",
//     status: "draft",
//   });

//   res.json({ message: "Draft saved", post });
// });

// // Publish a post (editor approval step)
// router.patch("/posts/:id/publish", async (req, res) => {
//   const post = await Post.findByIdAndUpdate(
//     req.params.id,
//     { status: "published", publishedAt: new Date() },
//     { new: true }
//   );
//   res.json({ message: "Published", post });
// });

// // Update a post (editor can tweak AI drafts before publishing)
// router.patch("/posts/:id", async (req, res) => {
//   const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(post);
// });

// // List all posts (drafts + published) for the dashboard
// router.get("/posts", async (req, res) => {
//   const posts = await Post.find().sort({ createdAt: -1 });
//   res.json(posts);
// });

// export default router;


const express     = require("express");
const { randomUUID } = require("crypto");
const Anthropic   = require("@anthropic-ai/sdk");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── All admin routes require a valid session 
router.use(requireAuth);

// ── Shared in-memory post store 
// Import from a shared module so blog.js reads the same array
const { posts } = require("../data/posts");

// ── GET /api/admin/posts — all posts including drafts 
router.get("/posts", (req, res) => {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json(sorted);
});

// ── POST /api/admin/posts — create a post 
router.post("/posts", (req, res) => {
  const { title, slug, excerpt, content, tags, authorName, status, metaDescription } =
    req.body;

  if (!title || !slug || !content) {
    return res.status(400).json({ error: "title, slug and content are required." });
  }
  if (posts.find((p) => p.slug === slug)) {
    return res.status(409).json({ error: "A post with that slug already exists." });
  }

  const words = content.trim().split(/\s+/).length;
  const post  = {
    id:              randomUUID(),
    title,
    slug,
    excerpt:         excerpt || "",
    content,
    tags:            Array.isArray(tags) ? tags : [],
    authorName:      authorName || "Akountin Professionals",
    author:          "editor",
    status:          status || "draft",
    readingMinutes:  Math.max(1, Math.round(words / 200)),
    metaDescription: metaDescription || "",
    createdAt:       new Date().toISOString(),
    publishedAt:     status === "published" ? new Date().toISOString() : null,
  };

  posts.unshift(post);
  res.status(201).json(post);
});

// ── PATCH /api/admin/posts/:id — update a post ────────────────────────────────
router.patch("/posts/:id", (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Post not found." });

  const updated = { ...posts[idx], ...req.body };

  if (req.body.content) {
    const words = req.body.content.trim().split(/\s+/).length;
    updated.readingMinutes = Math.max(1, Math.round(words / 200));
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

// ── POST /api/admin/generate — Claude AI draft generation ────────────────────
router.post("/generate", async (req, res) => {
  const { topic, keywords = [], tone = "professional" } = req.body;

  if (!topic) return res.status(400).json({ error: "topic is required." });

  const prompt = `You are a content writer for Akountin Professionals, a UK-based accounting firm.

Write a blog post about: "${topic}"
${keywords.length ? `Keywords to naturally include: ${keywords.join(", ")}` : ""}
Tone: ${tone}
Audience: UK small business owners, sole traders, limited company directors, and contractors.

Guidelines:
- Use British English spelling throughout (e.g. "organisation", "recognised", "favour")
- Reference UK-specific legislation, HMRC rules, and tax years where relevant
- Practical and specific — avoid vague generalities
- Use **bold text** to mark section headings within the content (no markdown # headers)
- Separate paragraphs with a blank line

Return ONLY valid JSON — no markdown fences, no preamble:
{
  "title": "...",
  "slug": "...",
  "excerpt": "One or two sentences summarising the post for the blog listing.",
  "content": "Full post body as plain text with **Bold Headings** and paragraph breaks.",
  "tags": ["Tag One", "Tag Two", "Tag Three"],
  "metaDescription": "SEO meta description under 160 characters."
}`;

  try {
    const message = await client.messages.create({
      model:      "claude-sonnet-4-6",
      max_tokens: 1000,
      messages:   [{ role: "user", content: prompt }],
    });

    const raw       = message.content[0].text.replace(/```json|```/g, "").trim();
    const generated = JSON.parse(raw);

    // Ensure slug is unique
    let { slug } = generated;
    if (posts.find((p) => p.slug === slug)) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    res.json({ ...generated, slug, author: "ai" });
  } catch (err) {
    console.error("Claude generation error:", err);
    res.status(500).json({ error: "Generation failed. Check your ANTHROPIC_API_KEY." });
  }
});

module.exports = router;