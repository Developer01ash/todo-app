const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: false,
    required: false,
  },
  email: {
    type: String,
    unique: false,
    required: false,
  },
  password: {
    type: String,
    unique: false,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
