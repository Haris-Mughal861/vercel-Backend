const Seller = require('../../models/Seller');

const verifyResetCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    if (
      seller.resetCode !== code ||
      !seller.codeExpiry ||
      seller.codeExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    res.status(200).json({ status: true, message: "Code verified" });
  } catch (err) {
    next(err);
  }
};

module.exports = verifyResetCode;
