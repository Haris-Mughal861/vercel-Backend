const express = require('express')
const addReview = require('../controllers/reviews/addReview')
const isAuth = require('../middlewares/isAuth')

const router = express.Router()
router.post('/', isAuth, addReview)
module.exports = router;
