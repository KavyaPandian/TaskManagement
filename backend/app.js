require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoUrl = process.env.MONGO_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected..."))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

// ✅ Serve Frontend (only if build folder exists)
if (process.env.NODE_ENV === "production") {
  const buildPath = path.resolve(__dirname, "../frontend/build");

  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(buildPath, "index.html"));
    });
  } else {
    console.warn("⚠️ Frontend build not found — skipping static serve");
  }
}

// Server Listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Backend is running on port ${port}`);
});
