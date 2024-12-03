const express = require('express')
const addToCart = require('../controllers/cart/addToCart')
const isAuth = require('../middlewares/isAuth')
const router = express.Router()
router.post('/', isAuth, addToCart)

module.exports = router