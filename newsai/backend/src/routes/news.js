// backend/src/routes/news.js
const express = require("express");
const { searchNews } = require("../controllers/newsController");
const Article = require("../models/Article");

const router = express.Router();

// Search route
router.post("/search", searchNews);

// List recent articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ fetchedAt: -1 }).limit(10);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
