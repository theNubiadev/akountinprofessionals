
// const express = require("express");
// const bcrypt  = require("bcrypt");
// const prisma    = require("../db/db");

// const router = express.Router();

// // ── POST /api/auth/login 
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await prisma.adminUser.findUnique({
//     where: { email: email.toLowerCase().trim() }
//   });

//   if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
//     return res.status(401).json({ error: "Invalid email or password." });
//   }

//   req.session.userId = user.id;
//   res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
// });


// // ── POST /api/auth/logout 
// router.post("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) return res.status(500).json({ error: "Logout failed." });
//     res.clearCookie("connect.sid");
//     res.json({ ok: true });
//   });
// });

// // ── GET /api/auth/me 
// router.get("/me", async (req, res) => {
//   if (!req.session.userId) return res.status(401).json({ error: "Not authenticated." });
//   const user = await prisma.adminUser.findUnique({ where: { id: req.session.userId } });
//   if (!user) return res.status(401).json({ error: "Not authenticated." });
//   res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
// });
// module.exports = router;


const express  = require("express");
const bcrypt   = require("bcrypt");
const crypto   = require("crypto");
const nodemailer = require("nodemailer");
const prisma   = require("../db/db");

const router = express.Router();

// ── Email transporter ─────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || "smtp.gmail.com",
  port:   parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendVerificationEmail(email, name, token) {
  const verifyUrl = `${process.env.BASE_PATH}/admin/verify-email?token=${token}`;

  await transporter.sendMail({
    from:    `"Akountin Professionals" <${process.env.SMTP_USER}>`,
    to:      email,
    subject: "Verify your Akountin Professionals account",
    html: `
      <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; color: #14213D;">
        <div style="background: #14213D; padding: 28px 32px;">
          <p style="color: #C9A227; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 6px;">
            Akountin Professionals
          </p>
          <h1 style="color: #fff; font-size: 22px; margin: 0;">Verify your account</h1>
        </div>
        <div style="padding: 32px; background: #fff; border: 1px solid #E3DFD6; border-top: none;">
          <p style="font-size: 15px; line-height: 1.7;">Hi ${name},</p>
          <p style="font-size: 15px; line-height: 1.7;">
            Your account has been created for the Akountin Professionals blog dashboard.
            Click the button below to verify your email and activate your account.
          </p>
          <a href="${verifyUrl}"
             style="display: inline-block; margin: 24px 0; background: #C9A227; color: #14213D;
                    font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 6px;
                    text-decoration: none;">
            Verify my account
          </a>
          <p style="font-size: 13px; color: #9C9384; line-height: 1.6;">
            This link expires in 24 hours. If you did not request this, ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #E3DFD6; margin: 24px 0;" />
          <p style="font-size: 12px; color: #B0A99A;">
            Akountin Professionals · Blog Dashboard
          </p>
        </div>
      </div>
    `,
  });
}

// ── POST /api/auth/register ───────────────────────────────────────────────────
router.post("/register", async (req, res) => {
  const { name, email, password, role = "editor" } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required." });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  try {
    // Check if email already exists
    const existing = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (existing) {
      return res.status(409).json({ error: "An account with that email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verifyToken  = crypto.randomBytes(32).toString("hex");
    const verifyTokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    await prisma.adminUser.create({
      data: {
        name,
        email:            email.toLowerCase().trim(),
        passwordHash,
        role,
        verified:         false,
        verifyToken,
        verifyTokenExpiry,
      },
    });

    await sendVerificationEmail(email, name, verifyToken);

    res.status(201).json({
      message: "Account created. Please check your email to verify your account.",
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
});

// ── GET /api/auth/verify/:token ───────────────────────────────────────────────
router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const user = await prisma.adminUser.findFirst({
      where: { verifyToken: token },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired verification link." });
    }

    if (user.verifyTokenExpiry < new Date()) {
      return res.status(400).json({ error: "Verification link has expired. Please register again." });
    }

    await prisma.adminUser.update({
      where: { id: user.id },
      data: {
        verified:         true,
        verifyToken:      null,
        verifyTokenExpiry: null,
      },
    });

    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ error: "Verification failed. Please try again." });
  }
});

// ── POST /api/auth/resend-verification ───────────────────────────────────────
router.post("/resend-verification", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required." });

  try {
    const user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) return res.status(404).json({ error: "No account found with that email." });
    if (user.verified) return res.status(400).json({ error: "Account is already verified." });

    const verifyToken       = crypto.randomBytes(32).toString("hex");
    const verifyTokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await prisma.adminUser.update({
      where: { id: user.id },
      data:  { verifyToken, verifyTokenExpiry },
    });

    await sendVerificationEmail(email, user.name, verifyToken);

    res.json({ message: "Verification email resent. Please check your inbox." });
  } catch (err) {
    console.error("Resend error:", err);
    res.status(500).json({ error: "Failed to resend verification email." });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    if (!user.verified) {
      return res.status(403).json({
        error: "Please verify your email before logging in.",
        unverified: true,   // frontend uses this to show resend button
        email: user.email,
      });
    }

    req.session.userId = user.id;

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
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
    const user = await prisma.adminUser.findUnique({
      where: { id: req.session.userId },
    });

    if (!user) return res.status(401).json({ error: "Not authenticated." });

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    console.error("Session lookup error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;