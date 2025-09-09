//backend/src/controllers/newsController.js

const Article = require("../models/Article");
const { fetchNews } = require("../utils/newsApi");
const { summarize, sentiment } = require("../utils/aiService");

exports.searchNews = async (req, res) => {
  const { keyword } = req.body;
  try {
    const articles = await fetchNews(keyword);

    const processed = await Promise.all(
      articles.map(async (a) => {
        const content = a.content || a.description || a.title;

        const summary = await summarize(content);
        const senti = await sentiment(content);

        const articleData = {
          headline: a.title,
          source: a.source.name,
          url: a.url,
          summary,
          sentiment: senti.label,
          fetchedAt: new Date(),
        };

        await Article.findOneAndUpdate({ url: a.url }, articleData, {
          upsert: true,
          new: true,
        });

        return articleData;
      })
    );

    res.json({ results: processed });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
