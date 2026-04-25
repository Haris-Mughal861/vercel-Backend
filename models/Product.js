const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    sale_price: { type: Number },
    purchase_price: { type: Number },
    detail: { type: String },
    stock: { type: Number },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    brand: { type: mongoose.Types.ObjectId, ref: 'Brand' },
    image: [{ type: String }],
    is_active: { type: Boolean, default: true },
    seller: { type: mongoose.Types.ObjectId, ref: 'Seller' },
    review: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
     sizes: [{ type: String }],     
    colors: [{ type: String }],   
  },
  { timestamps: true }
);


const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
