 
const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const blogRoutes    = require("./routes/blog");
const adminRoutes   = require("./routes/admin");
const authRoutes    = require("./routes/auth");
const contactRoutes = require("./routes/mailer");



const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
    credentials: true,   // allows the browser to send/receive session cookies
  })
);
 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Session middleware 
app.use(
  session({
    secret: process.env.SESSION_SECRET || "akountin-dev-secret-change-in-prod",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,                                    // not accessible via JS
      secure: process.env.NODE_ENV === "production",     // HTTPS only in prod
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 8,                       // 8 hours
    },
  })
);

// // ── Routes 
// app.use("/api/auth",    authRoutes);    // login, logout, /me
// app.use("/api/blog",    blogRoutes);    // public blog posts
// app.use("/api/admin",   adminRoutes);   // protected post CRUD + AI generate
// app.use("/api/contact", contactRoutes); // existing mailer


app.use("/backend/api/auth",    authRoutes);
app.use("/backend/api/blog",    blogRoutes);
app.use("/backend/api/admin",   adminRoutes);
app.use("/backend/api/contact", contactRoutes);


// ── Health check 
app.get("/backend", (req, res) => res.send("Backend is running..."));''

// ── Start ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));