const express = require('express');
const multer = require('multer');
const path = require('path');
const Banner = require('../models/Banner');

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({ storage });


router.post('/banner', upload.single('image'), async (req, res) => {
  try {
    const { title, subtitle, buttonText, buttonLink } = req.body;
    const image = req.file.filename;

    const newBanner = new Banner({ title, subtitle, image, buttonText, buttonLink });
    await newBanner.save();

    res.json({ status: true, message: "Banner uploaded", banner: newBanner });
  } catch (err) {
    res.json({ status: false, message: "Banner upload failed", error: err.message });
  }
});


router.get('/banner', async (req, res) => {
  const banners = await Banner.find().sort({ createdAt: -1 }).limit(5);
res.json({ status: true, banners });

});

module.exports = router;
