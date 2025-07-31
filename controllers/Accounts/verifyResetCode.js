const User = require('../../models/User');

const verifyResetCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      user.resetCode !== code ||
      !user.codeExpiry ||
      user.codeExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    res.status(200).json({ status: true, message: "Code verified" });
  } catch (err) {
    next(err);
  }
};

module.exports = verifyResetCode;
