const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
require('dotenv').config();


const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const messageRoutes=require("./routes/messageRoutes");
const Group = require("./models/Group");
const { configDotenv } = require("dotenv");

const app = express();
app.use(cors());
app.use(express.json());
const mongoUri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/messages",messageRoutes);

// Message cleanup (every day at midnight)
cron.schedule("0 0 * * *", async () => {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  await Group.updateMany({}, { $pull: { messages: { createdAt: { $lt: ninetyDaysAgo } } } });
  console.log("Old messages deleted");
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
