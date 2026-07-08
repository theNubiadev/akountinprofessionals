const express = require("express");
const bcrypt  = require("bcrypt");
const prisma  = require("../db/db");

const router = express.Router();

// ── POST /api/auth/register 
router.post("/register", async (req, res) => {
  const { name, email, password, role = "editor" } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required." });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  try {
    const existing = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (existing) {
      return res.status(409).json({ error: "An account with that email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.adminUser.create({
      data: {
        name,
        email:        email.toLowerCase().trim(),
        passwordHash,
        role,
        verified:     true,   // auto-verified, no email needed
      },
    });

    // Auto login after register
    req.session.userId = user.id;

    res.status(201).json({
      id:    user.id,
      name:  user.name,
      email: user.email,
      role:  user.role,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
});
// ── POST /api/auth/login 
router.post("/login", async (req, res) => {
  console.time("login");
  const { email, password } = req.body;

  console.time("db-query");
  const user = await prisma.adminUser.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
  console.timeEnd("db-query");

  if (!user) return res.status(401).json({ error: "Invalid email or password." });

  console.time("bcrypt");
  const match = await bcrypt.compare(password, user.passwordHash);
  console.timeEnd("bcrypt");

  if (!match) return res.status(401).json({ error: "Invalid email or password." });

  req.session.userId = user.id;
  console.timeEnd("login");

  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

// ── POST /api/auth/login 
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: "Email and password are required." });
//   }

//   try {
//     const user = await prisma.adminUser.findUnique({
//       where: { email: email.toLowerCase().trim() },
//     });

//     if (!user) {
//       return res.status(401).json({ error: "Invalid email or password." });
//     }

//     const match = await bcrypt.compare(password, user.passwordHash);
//     if (!match) {
//       return res.status(401).json({ error: "Invalid email or password." });
//     }

//     req.session.userId = user.id;

//     res.json({
//       id:    user.id,
//       name:  user.name,
//       email: user.email,
//       role:  user.role,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Server error during login." });
//   }
// });

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
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    const user = await prisma.adminUser.findUnique({
      where: { id: req.session.userId },
    });

    if (!user) return res.status(401).json({ error: "Not authenticated." });

    res.json({
      id:    user.id,
      name:  user.name,
      email: user.email,
      role:  user.role,
    });
  } catch (err) {
    console.error("Session lookup error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;