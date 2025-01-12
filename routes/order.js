const express = require('express');
const isAuth = require('../middlewares/isAuth');
const placeOrder = require('../controllers/order/placeOrder'); 
const getOrderHistory = require('../controllers/order/getOrderHistory')
const orderStatus = require('../controllers/order/orderStatus')
const getAllOrders = require('../controllers/order/getAllOrder')

const router = express.Router();
router.post('/place', isAuth, placeOrder);  
router.get('/history', isAuth, getOrderHistory);
router.post("/update", isAuth, orderStatus);
router.get("/list", isAuth, getAllOrders);
module.exports = router;