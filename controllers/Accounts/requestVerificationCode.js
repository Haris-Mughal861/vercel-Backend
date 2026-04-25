const VerificationCode = require('../../models/VerificationCode');
const sendEmailCode = require('../../utils/sendEmailCode');

const requestVerificationCode = async (req, res, next) => {
  const { email } = req.body;

  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await VerificationCode.deleteMany({ email });

    await VerificationCode.create({ email, code });

    await sendEmailCode({
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is: ${code}`
    });

    res.status(200).json({ message: "Verification code sent to email", status: true });
  } catch (err) {
    next(err);
  }
};

module.exports = requestVerificationCode;
