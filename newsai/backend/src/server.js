//backend/src/server.js

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const newsRoutes = require("./routes/news");
const adminRoutes = require("./routes/admin");
const analyticsRoutes = require("./routes/analytics");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Root endpoint
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// routes
app.use("/api/news", newsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Backend running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("DB connection error:", err));
