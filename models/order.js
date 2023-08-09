const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderID: { type: String, unique: true, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    quantity: { type: Number, required: true },
    pickupAddress: { type: String, required: true },
    manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    transporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
