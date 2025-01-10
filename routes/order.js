const express = require('express');
const isAuth = require('../middlewares/isAuth');
const placeOrder = require('../controllers/order/placeOrder'); 

const router = express.Router();
router.post('/place', isAuth, placeOrder);  
module.exports = router;