const User = require('../../models/User');
const Seller = require('../../models/Seller');
const LoginLog = require('../../models/LoginLog');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');

const login = async (req, res, next) => {
  const adminEmail = "xyz123@gmail.com";

  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('All fields are required');

    const formattedEmail = email.toLowerCase().trim();
    console.log(" Login request received for:", formattedEmail);

    let user = null;
    let role = null;
    let isPasswordMatch = false;

    if (formattedEmail === adminEmail) {
      const foundAdmin = await User.findOne({ email: formattedEmail });
      if (!foundAdmin) {
        console.log(" Admin not found");
        throw new Error('Admin not found');
      }

      console.log(" Attempting admin login...");
      console.log("Entered password:", password);
      console.log("Stored hash:", foundAdmin.password);

      isPasswordMatch = await bcrypt.compare(password, foundAdmin.password);
      console.log(" Match result:", isPasswordMatch);

      if (!isPasswordMatch) throw new Error("Password is incorrect");

      user = foundAdmin;
      role = 'admin';
    } else {
      let foundUser = await User.findOne({ email: formattedEmail });
      const foundSeller = await Seller.findOne({ email: formattedEmail });

      
      if (foundUser) {
        foundUser = await User.findById(foundUser._id); 
        console.log(" Attempting login for USER");
        console.log("Entered password:", password);
        console.log("Stored hashed password:", foundUser.password);

        isPasswordMatch = await bcrypt.compare(password, foundUser.password);
        console.log(" Match result:", isPasswordMatch);

        if (!isPasswordMatch) throw new Error("Password is incorrect");

        user = foundUser;
        role = 'user';
      } else if (foundSeller) {
        console.log(" Attempting login for SELLER");
        console.log("Entered password:", password);
        console.log("Stored hashed password:", foundSeller.password);

        isPasswordMatch = await bcrypt.compare(password, foundSeller.password);
        console.log(" Match result:", isPasswordMatch);

        if (!isPasswordMatch) throw new Error("Password is incorrect");

        user = foundSeller;
        role = 'seller';
      } else {
        console.log(" No user or seller found for:", formattedEmail);
        throw new Error('No user found with this email');
      }
    }

    console.log("Authentication successful for:", formattedEmail);
    const payload = { role, id: user._id, email: user.email };
    const { accessToken, refreshToken } = generateToken(payload);

    res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "Lax", secure: false });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "Lax", secure: false });

    await LoginLog.create({
      email: user.email,
      role,
      timestamp: new Date()
    });

    

    res.status(200).json({
      status: true,
      message: 'Login successful',
      user: {
        userId: user._id,
        role,
        email: user.email,
      },
    });

  } catch (error) {
    
    next(error);
  }
};

module.exports = login;
