//backend/src/utils/newsApi.js

const axios = require("axios");

exports.fetchNews = async (keyword) => {
  const res = await axios.get("https://newsapi.org/v2/everything", {
    params: { q: keyword, pageSize: 5, apiKey: process.env.NEWSAPI_KEY },
  });
  return res.data.articles;
};
