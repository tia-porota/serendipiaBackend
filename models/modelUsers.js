const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  idPic: {
    type: String,
    required: true,
    default: "user-default.png"
  },
  idGroups: {
    type: [mongoose.Schema.Types.ObjectId], ref: "grups",
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600*24*4
   },
});

const user = mongoose.model("users", userSchema);
module.exports = user;
