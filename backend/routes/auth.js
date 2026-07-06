// const express = require("express");
// const router  = express.Router();

// // ── Admin users 
// // Move these to your DB and hash passwords with bcrypt before going live
// const ADMIN_USERS = [
//   {
//     id:       "1",
//     email:    "editor@akountinprofessionals.co.uk",
//     password: "Editor2024!",
//     name:     "Sarah Williams",
//     role:     "editor",
//   },
//   {
//     id:       "2",
//     email:    "admin@akountinprofessionals.co.uk",
//     password: "Admin2024!",
//     name:     "Admin",
//     role:     "admin",
//   },
//   {
//     id: "3",
//     email: "info@akountinprofessionals.co.uk",
//     password: "Admin2026",
//     name: "Donald",
//     role: "Admin",
//   }
// ];

// // POST /api/auth/login
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: "Email and password are required." });
//   }

//   const user = ADMIN_USERS.find(
//     (u) => u.email === email.toLowerCase().trim() && u.password === password
//   );

//   if (!user) {
//     return res.status(401).json({ error: "Invalid email or password." });
//   }

//   req.session.userId = user.id;

//   res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
// });

// // POST /api/auth/logout
// router.post("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) return res.status(500).json({ error: "Logout failed." });
//     res.clearCookie("connect.sid");
//     res.json({ ok: true });
//   });
// });

// // GET /api/auth/me — called on page load to restore session
// router.get("/me", (req, res) => {
//   const user = ADMIN_USERS.find((u) => u.id === req.session.userId);
//   if (!user) return res.status(401).json({ error: "Not authenticated." });
//   res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
// });

// module.exports = router;


const express = require("express");
const bcrypt  = require("bcrypt");
const pool    = require("../db/db");

const router = express.Router();

// ── POST /api/auth/login ──────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const { rows } = await pool.query(
      "SELECT * FROM admin_users WHERE email = $1",
      [email.toLowerCase().trim()]
    );

    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    req.session.userId = user.id;

    res.json({
      id:    user.id,
      name:  user.name,
      email: user.email,
      role:  user.role,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login." });
  }
});

// ── POST /api/auth/logout ─────────────────────────────────────────────────────
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed." });
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
router.get("/me", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    const { rows } = await pool.query(
      "SELECT id, name, email, role FROM admin_users WHERE id = $1",
      [req.session.userId]
    );

    if (!rows[0]) return res.status(401).json({ error: "Not authenticated." });

    res.json(rows[0]);
  } catch (err) {
    console.error("Session lookup error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;