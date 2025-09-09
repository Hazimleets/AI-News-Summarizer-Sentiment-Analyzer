//backend/src/utils/aiService.js

const axios = require("axios");
const AI_URL = process.env.AI_SERVICE_URL;

exports.summarize = async (text) => {
  const res = await axios.post(`${AI_URL}/summarize`, { text });
  return res.data.summary;
};

exports.sentiment = async (text) => {
  const res = await axios.post(`${AI_URL}/sentiment`, { text });
  return res.data;
};
