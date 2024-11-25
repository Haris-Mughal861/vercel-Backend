const express = require('express')
const getProducts = require('../controllers/products/getProducts')
const addProduct = require('../controllers/products/addProduct')
const deleteProduct = require('../controllers/products/deleteProduct')
const getSingleProduct = require('../controllers/products/getSingleProduct')


const router = express.Router()


router.post('/add', addProduct);
router.get('/get', getProducts);
router.get('/single', getSingleProduct);
router.delete('/delete', deleteProduct);

module.exports = router;