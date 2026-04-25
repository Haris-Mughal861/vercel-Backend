const User = require('../../models/User');
const sendMail = require('../../utils/sendEmailCode');
const crypto = require('crypto');

const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetCode = crypto.randomInt(100000, 999999).toString();
    user.resetCode = resetCode;
    user.codeExpiry = Date.now() + 10 * 60 * 1000; 
    await user.save();

    await sendMail({
      to: email,
      subject: 'Password Reset Code',
      text: `Your password reset code is: ${resetCode}`
    });

    res.status(200).json({ status: true, message: "Reset code sent to your email" });
  } catch (err) {
    next(err);
  }
};

module.exports = requestPasswordReset;
