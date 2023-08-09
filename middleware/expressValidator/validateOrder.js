const { body } = require("express-validator");

const validateOrder = [
  body("orderID").notEmpty().withMessage("Order ID is required"),
  body("from").notEmpty().withMessage("Source is required"),
  body("to").notEmpty().withMessage("Destination is required"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity must be numeric"),
  body("pickupAddress").notEmpty().withMessage("Pickup Address is required"),
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
];
module.exports = validateOrder;
