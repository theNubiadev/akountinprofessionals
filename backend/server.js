const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Truehost SMTP transporter
const transporter = nodemailer.createTransport({
  host: "pld109.truehost.cloud",
  port: 587,
  secure: false,                  // TLS on port 587
  auth: {
    user: process.env.SMTP_USER,  // info@akountinprofessionals.co.uk
    pass: process.env.SMTP_PASS,  // your cPanel email password
  },
  tls: {
    rejectUnauthorized: false     // required for most cPanel hosts
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ status: "error", message: "All fields are required" });
  }

  try {
    await transporter.sendMail({
      from: `"Akounta Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,   // admin receives it in their inbox
      replyTo: email,              // Reply button goes back to the visitor
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #1a1a2e;">New Contact Form Enquiry</h2>
          <hr/>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="background:#f4f4f4; padding:12px; border-radius:6px;">${message}</p>
          <hr/>
          <small style="color:#999;">Sent from akountinprofessionals.co.uk contact form</small>
        </div>
      `,
    });

    return res.status(200).json({ status: "success", message: "Message sent successfully" });

  } catch (error) {
    console.error("Nodemailer error:", error);
    return res.status(500).json({ status: "error", message: "Failed to send email" });
  }
});

app.get("/", (req, res) => res.send("Backend is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));