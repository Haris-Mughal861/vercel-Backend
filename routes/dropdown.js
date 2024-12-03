const express = require('express');
const router = express.Router();
const categoryDropdown = require('../controllers/dropdown/category');
const productDropdown = require('../controllers/dropdown/brand');
const brandDropdown = require('../controllers/dropdown/brand');

// Example route for dropdown categories
router.get('/category', categoryDropdown);
router.get('/brand', brandDropdown)

module.exports = router;

