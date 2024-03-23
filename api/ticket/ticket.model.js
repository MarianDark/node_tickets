const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 1,
  },
  redeemed: {
    type: Boolean,
    default: false,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
