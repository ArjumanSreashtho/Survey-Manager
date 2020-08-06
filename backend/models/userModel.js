const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  userName: String,
  email: String,
  password: String,
  credits: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("users", User);
