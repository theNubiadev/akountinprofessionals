const express = require("express");
const cors = require("cors");
const blogRoutes = require("./routes/blog");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/mailer"); 

const fs = require("fs");
const path = require("path");
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, "utf8");
  envFile.split("\n").forEach((line) => {
    const [key, ...val] = line.split("=");
    if (key && val.length) process.env[key.trim()] = val.join("=").trim();
  });
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/blog", blogRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes); // ← mounted here, not inline in server.js

app.get("/backend", (req, res) => res.send("Backend is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));