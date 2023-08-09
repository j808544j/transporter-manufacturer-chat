const express = require("express");
const { validationResult } = require("express-validator");
const logger = require("../utils/logger");
const Message = require("../models/message");
const validateMessage = require("../middleware/expressValidator/validateMessage");
const isAuthenticated = require("../middleware/authentication");
const router = express.Router();

router.post("/message", isAuthenticated, validateMessage, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, manufacturer, transporter, order } = req.body;

    const newMessage = new Message({
      message,
      manufacturer,
      transporter,
      order,
    });

    await newMessage.save();
    logger.info("Message saved to MongoDB:");

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    logger.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message" });
  }
});

module.exports = router;
