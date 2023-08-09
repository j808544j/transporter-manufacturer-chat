const { body } = require("express-validator");

const validateMessage = [
  body("message").notEmpty().withMessage("Message is required"),
  body("manufacturer")
    .notEmpty()
    .withMessage("Manufacturer ID is required")
    .isMongoId()
    .withMessage("Invalid manufacturer ID"),
  body("transporter")
    .notEmpty()
    .withMessage("Transporter ID is required")
    .isMongoId()
    .withMessage("Invalid transporter ID"),
  body("order")
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid order ID"),
];

module.exports = validateMessage;
