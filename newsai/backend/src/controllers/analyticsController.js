//backend/src/controllers/analyticsController.js

const Article = require("../models/Article");

exports.getAnalytics = async (req, res) => {
  try {
    // Pie chart data
    const counts = await Article.aggregate([
      { $group: { _id: "$sentiment", value: { $sum: 1 } } },
    ]);
    const sentiment = counts.map((c) => ({ name: c._id, value: c.value }));

    // Trend over last 7 days
    const trend = await Article.aggregate([
      {
        $match: {
          fetchedAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: {
            day: { $dateToString: { format: "%Y-%m-%d", date: "$fetchedAt" } },
            sentiment: "$sentiment",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const groupedTrend = {};
    trend.forEach((t) => {
      const day = t._id.day;
      if (!groupedTrend[day])
        groupedTrend[day] = { date: day, positive: 0, negative: 0, neutral: 0 };
      if (t._id.sentiment === "Positive") groupedTrend[day].positive = t.count;
      if (t._id.sentiment === "Negative") groupedTrend[day].negative = t.count;
      if (t._id.sentiment === "Neutral") groupedTrend[day].neutral = t.count;
    });

    res.json({
      sentiment,
      trend: Object.values(groupedTrend),
      wordcloud: null, // optional enhancement
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Analytics fetch failed" });
  }
};
