const express = require ('express')
const addBrand = require('../controllers/brand/addBrand')
const router = express.Router()
router.post('/add',addBrand)



module.exports = router;