//backend/src/controllers/adminController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash: hash });
    res.json({ id: user._id, email: user.email });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Login failed" });
  }
};
