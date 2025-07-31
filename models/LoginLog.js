
const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
  email: String,
  role: String,
  loginTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LoginLog', loginLogSchema);
