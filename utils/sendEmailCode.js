const nodemailer = require("nodemailer");

const sendEmailCode = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,     
      pass: process.env.EMAIL_PASS,     
    },
  });

  await transporter.sendMail({
    from: `"Verify Your Email" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: `<h2>${text}</h2><p>This code is valid for 10 minutes.</p>`,
  });
};

module.exports = sendEmailCode;
