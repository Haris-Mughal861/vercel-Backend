const express = require('express');
const router = express.Router();

const requestVerificationCode = require('../controllers/Accounts/requestVerificationCode');
const verifyCodeAndRegisterUser = require('../controllers/Accounts/verifyCodeAndRegisterUser');
const login = require("../controllers/Accounts/login");

const requestPasswordReset = require('../controllers/Accounts/requestPasswordReset');
const verifyResetCode = require('../controllers/Accounts/verifyResetCode');
const resetPassword = require('../controllers/Accounts/resetPassword');

// Routes
router.post('/request-code', requestVerificationCode);
router.post('/verify-and-register', verifyCodeAndRegisterUser);
router.post('/login', login);

// Forgot password
router.post('/request-reset', requestPasswordReset);
router.post('/verify-reset', verifyResetCode);
router.post('/reset-password', resetPassword);

module.exports = router;
