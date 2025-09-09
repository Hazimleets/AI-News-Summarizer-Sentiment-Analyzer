//backend/src/models/Article.js

const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  headline: String,
  url: { type: String, unique: true },
  source: String,
  summary: String,
  sentiment: String,
  fetchedAt: Date
});

module.exports = mongoose.model("Article", ArticleSchema);