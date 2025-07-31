const Product = require('../../models/Product');

const getProducts = async (req, res, next) => {
  const pageNum = parseInt(req.query.page) || 1;
  const pageLimit = parseInt(req.query.limit) || 10; 

  try {
    const allProducts = await Product.find()
      .populate([
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
          select: '-product',
          populate: {
            path: 'user',
            select: 'name',
          },
        },
        {
          path: 'seller',
          select: 'status',
        },
      ])
      .sort({ _id: -1 });

    const filteredProducts = allProducts.filter(
      (product) => product.seller?.status !== 'Blocked'
    );

    const paginatedProducts = filteredProducts.slice(
      (pageNum - 1) * pageLimit,
      pageNum * pageLimit
    );

    res.status(200).json({
      message: 'success',
      status: true,
      list: paginatedProducts,
      productCount: filteredProducts.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProducts;
