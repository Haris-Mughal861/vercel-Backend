const express = require ('express')
const addBrand = require('../controllers/brand/addBrand')
const updateBrand = require('../controllers/brand/addBrand')
const router = express.Router()



router.post('/add',addBrand)
router.put('/:id',updateBrand)



module.exports = router;