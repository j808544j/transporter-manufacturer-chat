const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    transporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
