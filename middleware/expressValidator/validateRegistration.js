const { body } = require("express-validator");

const validateRegistration = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .isIn(["manufacturer", "transporter"])
    .withMessage("Invalid role"),
];

module.exports = validateRegistration;
