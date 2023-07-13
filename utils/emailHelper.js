const nodemailer = require("nodemailer");

const mailHelper = async (options) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const message = {
    from: process.env.GMAIL, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  };

  // send mail with defined transport object
  await transporter.sendMail(message);
};

module.exports = mailHelper;
