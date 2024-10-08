const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  blinks: [],
});

module.exports = mongoose.model("User", userSchema);
