const keys = require('../config/keys');

const emailTemplate = (id, title, body) => {
  return (
    `<html>
      <body>
        <div>
          <strong>${title}</strong>
        </div>
        <div style="text-align: center;">
          <h3>Please answer the following question:</h3>
          <p>${body}</p>
          <div>
            <a href=${keys.DOMAIN}/api/survey/${id}/yes>Yes</a>
          </div>
          <div>
            <a href=${keys.DOMAIN}/api/survey/${id}/no>No</a>
          </div>
        </div>
      </body>
    </html>`);
};

module.exports = emailTemplate;
