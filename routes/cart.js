const express = require('express')
const addToCart = require('../controllers/cart/addToCart')
const isAuth = require('../middlewares/isAuth')
const getCart = require('../controllers/cart/getCart')
const removecart = require('../controllers/cart/removecart')
const deleteCart = require('../controllers/cart/deleteCart')
const router = express.Router()


router.post('/add', isAuth, addToCart);
router.get('/get', isAuth, getCart);
router.put("/update",isAuth,removecart);
router.delete('/delete',isAuth,deleteCart);

module.exports = router;