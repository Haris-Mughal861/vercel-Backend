const express = require('express');
const addBrand = require('../controllers/brand/addBrand');
const updateBrand = require('../controllers/brand/addBrand');
const fileUpload = require('../middlewares/fileUpload'); 

const router = express.Router();


router.post('/add', fileUpload.single('image'), addBrand);
router.put('/:id', updateBrand);

module.exports = router;
