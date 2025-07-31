const Seller = require('../../models/Seller');
const sendEmail = require('../../utils/sendEmailCode'); 
const crypto = require('crypto');

const requestSellerPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const formattedEmail = email.toLowerCase();

    const seller = await Seller.findOne({ email: formattedEmail });
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 1000 * 60 * 10; 

    seller.resetCode = code;
    seller.codeExpiry = expiry;

    await seller.save();

    await sendEmail({  
      to: formattedEmail,
      subject: "Seller Password Reset Code",
      text: `Your password reset code is ${code}. It will expire in 10 minutes.`
    });

    res.status(200).json({ status: true, message: "Reset code sent to seller email" });

  } catch (err) {
    next(err);
  }
};

module.exports = requestSellerPasswordReset;
