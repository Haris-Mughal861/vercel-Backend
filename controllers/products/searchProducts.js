const Product = require('../../models/Product');

const searchProducts = async (req, res, next) => {
  try {
    const keyword = req.query.q?.trim();
    if (!keyword) {
      return res.status(400).json({ status: false, message: 'Missing search keyword' });
    }

    
    const regex = new RegExp(keyword.split(' ').join('|'), 'i'); 

    const list = await Product.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ]
    }).populate([
      { path: 'category', select: 'title' },
      { path: 'brand', select: 'title' }
    ]);

    res.status(200).json({ status: true, list });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

module.exports = searchProducts;
