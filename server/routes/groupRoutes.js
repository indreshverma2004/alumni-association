const express = require("express");
const jwt = require("jsonwebtoken");
const Group = require("../models/Group");

const router = express.Router();

// Middleware for authentication
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

// Fetch all groups
router.get("/", authenticate, async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch groups", error: err.message });
  }
});

// Create a group
router.post("/", authenticate, async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Group name is required" });
  }

  try {
    const groupExists = await Group.findOne({ name });
    if (groupExists) {
      return res.status(400).json({ message: "Group already exists" });
    }

    const group = new Group({ name });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: "Failed to create group", error: err.message });
  }
});

module.exports = router;
