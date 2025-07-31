const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); 

const run = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
  console.log("✅ Connected to DB");

  const email = "harismughal861@gmail.com";

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    console.log("❌ User not found");
    process.exit();
  }

  console.log("📦 User found:");
  console.log("🆔 ID:", user._id);
  console.log("📧 Email:", user.email);
  console.log("🔐 Password hash:", user.password);

  const isMatch = await bcrypt.compare("1234567890", user.password);
  console.log("✅ Does '1234567890' match hash?", isMatch);

  process.exit();
};

run();
