const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const isAuthenticated = require("../middleware/authentication");
const Message = require("../models/message");

router.get("/messages", isAuthenticated, async (req, res) => {
  try {
    const user = req.user;

    const query =
      user.role === "manufacturer"
        ? { manufacturer: user.userId }
        : { transporter: user.userId };

    const messages = await Message.find(query).sort("createdAt");

    logger.info(`Fetched messages for user with ID: ${user.userId}`);
    res.json(messages);
  } catch (error) {
    logger.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
