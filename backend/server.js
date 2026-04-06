const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

// Manual env parsing (bypasses dotenv issues on cPanel)
const fs = require("fs");
const path = require("path");
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, "utf8");
  envFile.split("\n").forEach((line) => {
    const [key, ...val] = line.split("=");
    if (key && val) process.env[key.trim()] = val.join("=").trim();
  });
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ← fixes req.body undefined

const transporter = nodemailer.createTransport({
  host: "pld109.truehost.cloud",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP connection failed:", error.message);
  } else {
    console.log("SMTP connection successful ✅");
  }
});

app.post("/backend/api/contact", async (req, res) => {
  console.log("Request body:", req.body); // debug log

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }

  try {
    await transporter.sendMail({
      from: `"Akountin Professional Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `New Enquiry from ${name} via Website`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #1a1a2e;">New Contact Form Enquiry</h2>
          <hr/>
          <p>You have received a new message from your website contact form.</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="background:#f4f4f4; padding:12px; border-radius:6px;">${message}</p>
          <hr/>
          <small style="color:#999;">Sent from akountinprofessionals.co.uk contact form</small>
        </div>
      `,
    });

    return res
      .status(200)
      .json({ status: "success", message: "Message sent successfully" });
  } catch (error) {
    console.error("Nodemailer error:", error.message);
    return res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/backend", (req, res) => res.send("Backend is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
