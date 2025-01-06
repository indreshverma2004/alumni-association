const express = require("express");
const Group = require("../models/Group");
const Message = require("../models/Messages");

const router = express.Router();

// Middleware for authentication (same as before)
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secretKey"); // Replace "secretKey" with an environment variable for security
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token", error: err.message });
  }
};

// Post a message to a group
router.post("/:groupId/messages", async (req, res) => {
  const { groupId } = req.params;
  const { content } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).send({ message: "Group not found" });

    // Create a new message document
    const message = new Message({ content });
    await message.save();

    // Add the message reference to the group's messages array
    group.messages.push(message._id);
    await group.save();

    res.status(201).send({ message: "Message added successfully", messageId: message._id });
  } catch (err) {
    res.status(500).send({ message: "Failed to add message", error: err.message });
  }
});

// Fetch messages from a group
router.get("/:groupId/messages", async (req, res) => {
    const { groupId } = req.params;
    try {
      const group = await Group.findById(groupId).populate("messages"); // Populate the messages field
      if (!group) return res.status(404).send({ message: "Group not found" });
  
      res.status(200).send(group.messages); // Send the populated messages
    } catch (err) {
      res.status(500).send({ message: "Failed to fetch messages", error: err.message });
    }
  });
  module.exports = router;