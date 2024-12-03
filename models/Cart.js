const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: 'Product' }, // Reference to Product model
    user: { type: mongoose.Types.ObjectId, ref: 'User' },       // Reference to User model
    quantity: { type: Number, default: 0 },                    // Quantity of product in the cart
    cartTotal: { type: Number },                               // Total cost of items in the cart
  },
  { timestamps: true }                                         // Automatically add createdAt and updatedAt fields
);

// Avoid OverwriteModelError
const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

module.exports = Cart;





