const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String },
  userDetail: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
