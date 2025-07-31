const VerificationCode = require('../../models/VerificationCode');
const User = require('../../models/User');
const bcrypt = require("bcrypt");
const joi = require("joi");

const verifyCodeAndRegisterUser = async (req, res, next) => {
  const { name, email, password, code } = req.body;

  try {
    const foundCode = await VerificationCode.findOne({ email });

    if (!foundCode || foundCode.code !== code) {
      throw new Error("Invalid or expired verification code");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    await VerificationCode.deleteOne({ email });

    res.status(200).json({ message: "User registered successfully", status: true });
  } catch (err) {
    next(err);
  }
};

module.exports = verifyCodeAndRegisterUser;
