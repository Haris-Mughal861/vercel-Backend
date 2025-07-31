const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const User = require('../models/User'); 

const isAuth = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);

    
    let user = await Seller.findById(decoded.id);
    
   
    if (!user) {
      user = await User.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};

module.exports = isAuth;


