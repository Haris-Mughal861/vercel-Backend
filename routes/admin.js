const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');
const LoginLog = require('../models/LoginLog'); 

router.get('/all-sellers', async (req, res) => {
  try {
    const sellers = await Seller.find().select('-password');
    res.status(200).json({ status: true, sellers });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to fetch sellers' });
  }
});

router.get('/login-logs', async (req, res) => {
  try {
    const logs = await LoginLog.find().sort({ timestamp: -1 });
    res.status(200).json({ status: true, logs });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to fetch logins' });
  }
});

router.put('/block-seller', async (req, res, next) => {
  try {
    const { sellerId } = req.query;
    if (!sellerId) return res.status(400).json({ status: false, message: "Seller ID is required" });

    const seller = await Seller.findById(sellerId);
    if (!seller) return res.status(404).json({ status: false, message: "Seller not found" });

    seller.status = seller.status === 'Blocked' ? 'Active' : 'Blocked';
    await seller.save();

    res.status(200).json({
      status: true,
      message: `Seller ${seller.status === 'Blocked' ? 'blocked' : 'unblocked'} successfully`,
      sellerStatus: seller.status
    });
  } catch (error) {
    console.error("Error in /block-seller:", error.message);
    res.status(500).json({ status: false, message: "Server error" });
  }
});

module.exports = router;
