const Review = require("../../models/Review");
const Product = require("../../models/Product");

const rateProduct = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;

    if (!productId || !rating) {
      return res.status(400).json({ message: "Product ID and rating are required", status: false });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found", status: false });
    }

    
    const existingReview = await Review.findOne({ user: userId, product: productId });
    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
      await existingReview.save();
    } else {
      const newReview = new Review({ user: userId, product: productId, rating, comment });
      await newReview.save();

      product.review.push(newReview._id);
      await product.save();
    }

    res.status(200).json({ message: "Review submitted successfully", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = rateProduct;
