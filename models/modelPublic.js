const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  msgs:
  {
    type: [mongoose.Schema.Types.ObjectId], ref: "msgs",
    default: [],
  }
 
});

const public = mongoose.model("public", groupSchema);
module.exports = public;
