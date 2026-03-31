const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Resend } = require("resend");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
    });
  }

  try {
    await resend.emails.send({
      from: "Website Contact <info@akountinprofessionals.co.uk>",
      to: ["info@akountinprofessionals.co.uk"],
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `,
    });

    return res.status(200).json({
      status: "success",
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Resend error:", error);

    return res.status(500).json({
      status: "error",
      message: "Failed to send email",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));