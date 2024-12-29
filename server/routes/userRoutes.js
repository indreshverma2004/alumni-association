const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  const { email, phone, rollNo, password } = req.body;
  try {
    const userExists = await User.findOne({ rollNo });
    if (userExists) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, phone, rollNo, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).send({ message: "Signup failed", error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { rollNo, phone } = req.body;
  try {
    const user = await User.findOne({ rollNo, phone });
    if (!user) return res.status(401).send({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1d" });
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send({ message: "Login failed", error: err.message });
  }
});

module.exports = router;
