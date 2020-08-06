const Schema = require("mongoose").Schema;

const Recipient = new Schema({
  email: String,
  responded: {
    type: Boolean,
    default: false,
  },
});

module.exports = Recipient;
