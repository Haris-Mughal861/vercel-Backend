const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  isApproved: {
    type: Boolean,
    default: false,
  },

  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],

  role: {
    type: String,
    required: true,
    default: 'seller',
  },

  status: {
    type: String,
    enum: ['Active', 'Blocked'],
    default: 'Active'
  },


  resetCode: {
    type: String,
  },
  codeExpiry: {
    type: Date,
  },

}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
