const Seller = require('../../models/Seller');
const bcrypt = require('bcrypt');

const resetPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;
    const formattedEmail = email.toLowerCase();

    const seller = await Seller.findOne({ email: formattedEmail });
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    if (
      seller.resetCode !== code ||
      !seller.codeExpiry ||
      seller.codeExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    seller.password = hashedPassword;
    seller.resetCode = null;
    seller.codeExpiry = null;

    await seller.save();

    res.status(200).json({ status: true, message: "Seller password updated successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = resetPassword;
