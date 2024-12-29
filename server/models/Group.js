const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  messages: [messageSchema],
});

module.exports = mongoose.model("Group", groupSchema);
