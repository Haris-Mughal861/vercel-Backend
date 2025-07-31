const Product = require('../../models/Product');

const getSingleProduct = async (req, res, next) => {
  const productId = req.query.productId;
  try {
    const product = await Product.findById(productId).populate([
      {
        path: 'category',
        select: '-products -__v',
      },
      {
        path: 'brand',
        select: '-products -__v',
      },
      {
        path: 'review',
        populate: {
          path: 'user',
          select: 'name',
        },
      },
    ]);

    if (!product) {
      return res.status(404).json({ message: "Product not found", status: false });
    }

    res.status(200).json({ message: "success", status: true, findedProduct: product });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleProduct;
