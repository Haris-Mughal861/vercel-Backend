const express = require('express')
const getProducts = require('../controllers/products/getProducts')

const addProduct = require('../controllers/products/addProduct')
const getSingleProduct = require('../controllers/products/getSingleProduct')


const router = express.Router()


router.post('/add', addProduct);
router.get('/get', getProducts);
router.get('/single', getSingleProduct);

module.exports = router;