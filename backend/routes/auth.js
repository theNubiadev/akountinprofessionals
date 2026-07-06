
const express = require("express");
const bcrypt  = require("bcrypt");
const prisma    = require("../db/db");

const router = express.Router();

// ── POST /api/auth/login 
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.adminUser.findUnique({
    where: { email: email.toLowerCase().trim() }
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  req.session.userId = user.id;
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});


// ── POST /api/auth/logout 
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed." });
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});

// ── GET /api/auth/me 
router.get("/me", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Not authenticated." });
  const user = await prisma.adminUser.findUnique({ where: { id: req.session.userId } });
  if (!user) return res.status(401).json({ error: "Not authenticated." });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});
module.exports = router;