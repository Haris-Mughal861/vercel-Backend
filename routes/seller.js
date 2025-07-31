const express = require('express');
const router = express.Router();

const {
  registerSeller,
  getSellerDashboard,
  addProductBySeller,
} = require('../controllers/Seller/sellerController');

const isAuth = require('../middlewares/isAuth');
const fileUpload = require('../middlewares/fileUpload');


const requestVerificationCode = require('../controllers/Seller/requestVerificationCode');
const verifyCodeAndRegisterSeller = require('../controllers/Seller/verifyCodeAndRegisterSeller');


const requestPasswordReset = require('../controllers/Seller/requestPasswordReset');
const verifyResetCode = require('../controllers/Seller/verifyResetCode');
const resetPassword = require('../controllers/Seller/resetPassword');


router.post('/request-reset', requestPasswordReset);
router.post('/verify-reset', verifyResetCode);
router.post('/reset-password', resetPassword);


router.post('/request-code', requestVerificationCode);
router.post('/verify-and-register', verifyCodeAndRegisterSeller);


router.get('/dashboard', isAuth, getSellerDashboard);
router.post('/add-product', isAuth, fileUpload.array('image', 10), addProductBySeller);

module.exports = router;
