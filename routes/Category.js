const express = require('express');
const addCategory = require('../controllers/category/addCategory');
const updateCategory = require('../controllers/category/addCategory');
const fileUpload = require('../middlewares/fileUpload'); 

const router = express.Router();


router.post('/add', fileUpload.single('image'), addCategory);
router.put('/:id', updateCategory);


module.exports = router;
