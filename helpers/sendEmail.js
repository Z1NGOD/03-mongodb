const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SG_API, SG_EMAIL } = process.env;
sgMail.setApiKey(SG_API);

const sendEmail = async ({to, subject, html}) => {
  const msg = {
    to,
    from: SG_EMAIL,
    subject,
    html,
  };
  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
