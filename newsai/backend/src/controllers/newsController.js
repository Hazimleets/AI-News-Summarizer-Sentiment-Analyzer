// backend/src/controllers/newsController.js

const axios = require("axios");
const Article = require("../models/Article");

const AI_URL = process.env.AI_SERVICE_URL || "http://localhost:8000"; 
const NEWSAPI_KEY = process.env.NEWSAPI_KEY; 

exports.searchNews = async (req, res) => {
  const { keyword } = req.body;
  if (!keyword) return res.status(400).json({ error: "Keyword required" });

  try {
    // 1. Fetch from NewsAPI
    const newsRes = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: keyword,
        sortBy: "publishedAt",
        pageSize: 5,
        apiKey: NEWSAPI_KEY,
      },
    });

    const articles = newsRes.data.articles || [];

    // 2. Process each article with AI
    const processed = await Promise.all(
      articles.map(async (a) => {
        const text = a.content || a.description || a.title;

        let summary = "";
        let sentiment = "Neutral";

        try {
          const summaryRes = await axios.post(`${AI_URL}/summarize`, { text });
          summary = summaryRes.data.summary || text;
        } catch {
          summary = text;
        }

        try {
          const sentiRes = await axios.post(`${AI_URL}/sentiment`, { text });
          sentiment = sentiRes.data.label || "Neutral";
        } catch {
          sentiment = "Neutral";
        }

        const articleData = {
          headline: a.title,
          source: a.source?.name || "Unknown",
          url: a.url,
          summary,
          sentiment,
          fetchedAt: new Date(),
        };

        await Article.findOneAndUpdate({ url: a.url }, articleData, {
          upsert: true,
          new: true,
        });

        return articleData;
      })
    );

    res.json({ keyword, results: processed });
  } catch (err) {
    console.error("News fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
