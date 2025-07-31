const Product = require('../../models/Product');
const Brand = require('../../models/Brand');
const Category = require('../../models/Category');

const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId; 

  try {
    
    await Product.findByIdAndDelete(productId);

    
    await Category.updateMany({}, { $pull: { Products: productId } });
    await Brand.updateMany({}, { $pull: { Products: productId } });

   res.status(200).json({ message: 'Product deleted successfully', status: true });

  } catch (error) {
    next(error);
  }
};

module.exports = deleteProduct;
