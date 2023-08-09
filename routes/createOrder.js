const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");
const logger = require("../utils/logger");
const validateOrder = require("../middleware/expressValidator/validateOrder");
const isAuthenticated = require("../middleware/authentication");
const checkUserRole = require("../middleware/checkUserRole");
const Message = require("../models/message");

router.post(
  "/createorder",
  isAuthenticated,
  checkUserRole("manufacturer"),
  validateOrder,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        orderID,
        from,
        to,
        quantity,
        pickupAddress,
        manufacturer,
        transporter,
      } = req.body;

      const existingOrder = await Order.findOne({ orderID });

      if (existingOrder) {
        return res
          .status(400)
          .json({ message: "Error :OrderID already exists" });
      }
      const existingTransporter = await User.findById({ _id: transporter });

      if (!existingTransporter || existingTransporter.role !== "transporter") {
        return res.status(400).json({ message: "Invalid transporter" });
      }

      const newOrder = new Order({
        orderID,
        from,
        to,
        quantity,
        pickupAddress,
        manufacturer,
        transporter,
      });

      await newOrder.save();

      const newMessage = new Message({
        message: "New order created",
        manufacturer: newOrder.manufacturer,
        transporter: newOrder.transporter,
        order: newOrder._id,
      });

      await newMessage.save();
      logger.info(`Order created: ${orderID}`);
      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      logger.error("Error creating order:", error);
      res.status(500).json({ message: "Error creating order" });
    }
  }
);

module.exports = router;
