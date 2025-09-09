// backend/src/server.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");
const analyticsRoutes = require("./routes/analytics");

const app = express();
app.use(cors());
app.use(express.json());

// connect to Mongo
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/newsai";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/analytics", analyticsRoutes);

// health check
app.get("/", (req, res) => res.send("✅ NewsAI API is running"));

/* =====================
   START SERVER
===================== */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
