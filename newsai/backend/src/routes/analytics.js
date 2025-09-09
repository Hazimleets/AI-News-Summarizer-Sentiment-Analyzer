//backend/src/routes/analytics.js

const express = require("express");
const { getAnalytics } = require("../controllers/analyticsController");
const { authMiddleware } = require("../utils/auth");

const router = express.Router();

router.get("/", authMiddleware, getAnalytics);

module.exports = router;