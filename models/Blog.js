const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  title: String,
  summary: String,
  content: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
