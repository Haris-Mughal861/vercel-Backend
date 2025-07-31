const Product = require('../../models/Product');

const getRecommendations = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const baseProduct = await Product.findById(productId)
      .populate(['category', 'brand']);

    if (!baseProduct) {
      return res.status(404).json({ status: false, message: 'Product not found' });
    }

    const recommendedProducts = await Product.find({
      _id: { $ne: productId }, 
      category: baseProduct.category._id,
      brand: baseProduct.brand._id,
    })
      .limit(5)
      .select('title image sale_price');

    res.status(200).json({
      status: true,
      recommendations: recommendedProducts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getRecommendations;
