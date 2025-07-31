const User = require('../../models/User');
const bcrypt = require('bcrypt');

const resetPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;
    const formattedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: formattedEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.resetCode !== code ||
      !user.codeExpiry ||
      user.codeExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetCode = null;
    user.codeExpiry = null;

    await user.save();

    res.status(200).json({ status: true, message: "Password updated successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = resetPassword;
