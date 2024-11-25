const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600*4
   },
});

const msg = mongoose.model("msgs", msgSchema);
module.exports = msg;
