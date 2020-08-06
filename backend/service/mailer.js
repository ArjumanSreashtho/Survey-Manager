const sendGridMail = require("@sendgrid/mail");

const emailTemplate = require("../service/emailTemplate");
const keys = require("../config/keys");

sendGridMail.setApiKey(keys.SEND_GRID_KEY);

const mailer = (id, title, subject, body, email) => {
  const msg = {
    to: email,
    from: "arjumansreashtho@gmail.com",
    subject: subject,
    text: title,
    html: emailTemplate(id, title, body),

  };

  sendGridMail.send(msg);
};

module.exports = mailer;
