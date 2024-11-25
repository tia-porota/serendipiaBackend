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
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600*24
   },
 
});

const group = mongoose.model("grups", groupSchema);
module.exports = group;
