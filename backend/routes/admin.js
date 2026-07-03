// routes/admin.js

const express = require("express");
const   Post = require("../models/Post.js");
const generateBlogPost = require("../services/claudeServices.js");

const router = express.Router();

// Generate a post with Claude (returns draft — editor reviews before publishing)
router.post("/generate", async (req, res) => {
  const { topic, keywords, tone } = req.body;

  if (!topic) return res.status(400).json({ error: "Topic is required" });

  const generated = await generateBlogPost({ topic, keywords, tone });

  // Save as draft so editor can review/edit before publishing
  const post = await Post.create({
    ...generated,
    author: "ai",
    authorName: "AI Assistant",
    status: "draft",
  });

  res.json({ message: "Draft created", post });
});

// Editor creates a post manually
router.post("/posts", async (req, res) => {
  const { title, slug, excerpt, content, tags, metaDescription, authorName } = req.body;

  const post = await Post.create({
    title, slug, excerpt, content, tags, metaDescription,
    author: "editor",
    authorName: authorName || "The Team",
    status: "draft",
  });

  res.json({ message: "Draft saved", post });
});

// Publish a post (editor approval step)
router.patch("/posts/:id/publish", async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { status: "published", publishedAt: new Date() },
    { new: true }
  );
  res.json({ message: "Published", post });
});

// Update a post (editor can tweak AI drafts before publishing)
router.patch("/posts/:id", async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
});

// List all posts (drafts + published) for the dashboard
router.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

export default router;