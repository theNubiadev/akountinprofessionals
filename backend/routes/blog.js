// routes/blog.js
import express from "express";
import Post from "../models/Post.js";
const express = re
const router = express.Router();

// List published posts (with pagination)
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const posts = await Post.find({ status: "published" })
    .sort({ publishedAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .select("-content"); // exclude full content from list view
  res.json(posts);
});

// Single post by slug
router.get("/:slug", async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug, status: "published" });
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

export default router;