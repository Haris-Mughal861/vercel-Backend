const express = require('express')

const addProduct = require('../controllers/products/addProduct')


const router = express.Router()


router.post('/add', addProduct);

module.exports = router;