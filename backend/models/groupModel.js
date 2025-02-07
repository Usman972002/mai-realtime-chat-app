const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroupMessage",
    default: [],
  }],
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;