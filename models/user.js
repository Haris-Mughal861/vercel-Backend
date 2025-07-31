const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true 
  },
  password: {
    type: String
  },
  role: {
    type: String,
    default: 'User'
  },
  order: [{ type: mongoose.Types.ObjectId, ref: "Order" }],

 
  resetCode: {
    type: String,
  },
  codeExpiry: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
