const express = require("express");
const jwt = require("jsonwebtoken");
const Group = require("../models/Group");

const router = express.Router();

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, "secretKey");
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).send({ message: "Invalid token" });
  }
};

// Fetch all groups
router.get("/", authenticate, async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).send(groups);
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch groups", error: err.message });
  }
});

// Create a group
router.post("/", authenticate, async (req, res) => {
  const { name } = req.body;
  try {
    const groupExists = await Group.findOne({ name });
    if (groupExists) return res.status(400).send({ message: "Group already exists" });

    const group = new Group({ name });
    await group.save();
    res.status(201).send(group);
  } catch (err) {
    res.status(500).send({ message: "Failed to create group", error: err.message });
  }
});

// Post a message to a group
router.post("/:groupId/messages", authenticate, async (req, res) => {
  const { groupId } = req.params;
  const { content } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).send({ message: "Group not found" });

    group.messages.push({ content, createdAt: new Date() });
    await group.save();
    res.status(201).send({ message: "Message added successfully" });
  } catch (err) {
    res.status(500).send({ message: "Failed to add message", error: err.message });
  }
});

// Fetch messages from a group
router.get("/:groupId/messages", authenticate, async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).send({ message: "Group not found" });

    res.status(200).send(group.messages);
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch messages", error: err.message });
  }
});

module.exports = router;
