const nodemailer = require("nodemailer");

const sendEmailCode = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Verify Your Email" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `<h2>${text}</h2><p>This code is valid for 10 minutes.</p>`,
    });

    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

module.exports = sendEmailCode;
