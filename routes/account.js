const express = require('express');
const rigister = require('../controllers/Accounts/rigister');
const login = require("../controllers/Accounts/login");

const router = express.Router();

router.post('/user/rigister', rigister);
router.post("/login", login);

module.exports = router;



