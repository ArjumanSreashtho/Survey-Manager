const mongoose = require("mongoose");

const Recipient = require("./recipientModel");

const Schema = mongoose.Schema;

const Survey = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  body: String,
  subject: String,
  recipients: [Recipient],
  createDate: Date,
  lastCheck: Date,
  yes: {
    type: Number,
    default: 0,
  },
  no: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("surveys", Survey);
