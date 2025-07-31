const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: 'Product' }, 
    user: { type: mongoose.Types.ObjectId, ref: 'User' },       
    quantity: { type: Number, default: 0 },                    
    cartTotal: { type: Number },                               
  },
  { timestamps: true }                                        
);


const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

module.exports = Cart;





