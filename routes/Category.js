const express = require('express')
const addCategory = require("../controllers/category/addCategory");
const updateCategory = require('../controllers/category/updateCategory')

const router = express.Router();

router.post("/add",addCategory);
router.put("/update",updateCategory);

module.exports= router;