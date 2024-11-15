const express = require ('express')
const imageUpload = require("../controllers/galary/uploadImage");
const fileUpload = require('../middlewares/fileUpload');
const serverPath = require('../middlewares/serverPath')

const router = express.Router();

router.post("/upload",fileUpload(),serverPath,imageUpload);

module.exports = router;