//backend/src/models/User.js

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  passwordHash: String
});

module.exports = mongoose.model("User", UserSchema);