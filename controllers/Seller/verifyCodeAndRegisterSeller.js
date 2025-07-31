const VerificationCode = require('../../models/VerificationCode');
const Seller = require('../../models/Seller');
const bcrypt = require("bcrypt");
const joi = require("joi");

const verifyCodeAndRegisterSeller = async (req, res, next) => {
  const { name, email, password, code } = req.body;

  const { error: validationError } = validateSeller(req.body);
  if (validationError) {
    const err = new Error(validationError.details[0].message);
    err.statusCode = 400;
    return next(err);
  }

  try {
    const existing = await Seller.findOne({ email: email.toLowerCase() });
    if (existing) {
      throw new Error("This email is already registered");
    }

    const foundCode = await VerificationCode.findOne({ email });

    if (!foundCode || foundCode.code !== code) {
      throw new Error("Invalid or expired verification code");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newSeller.save();
    await VerificationCode.deleteOne({ email });

    res.status(200).json({ message: "Seller registered successfully", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyCodeAndRegisterSeller;

function validateSeller(data) {
  const schema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(12).required(),
    code: joi.string().length(6).required(),
  });

  return schema.validate(data);
}
