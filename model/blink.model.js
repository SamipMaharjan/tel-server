const mongoose = require("mongoose");

const blinkSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  links: {
    type: Object,
    required: false,
  },
  slug: { type: String, required: false },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  end: {
    type: Date,
    required: false,
  },
  minBet: {
    type: Number,
    required: false,
  },
  maxBet: {
    type: Number,
    required: false,
  },
  odds: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Blink", blinkSchema);
