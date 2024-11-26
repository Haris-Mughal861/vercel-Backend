const express = require('express')
const getProducts = require('../controllers/products/getProducts')
const addProduct = require('../controllers/products/addProduct')
const deleteProduct = require('../controllers/products/deleteProduct')
const getSingleProduct = require('../controllers/products/getSingleProduct')
const getProductByCat = require('../controllers/products/getProductByCat')
const getProductByBrand = require('../controllers/products/getProductByBrand')


const router = express.Router()


router.post('/add', addProduct);
router.get('/get', getProducts);
router.get('/single', getSingleProduct);
router.delete('/delete', deleteProduct);
router.get('/get/category', getProductByCat);
router.get('/get/brand', getProductByBrand);

module.exports = router;