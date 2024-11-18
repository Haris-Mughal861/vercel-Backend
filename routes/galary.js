const express = require ('express')
const imageUpload = require("../controllers/galary/uploadImage");
const fileUpload = require('../middlewares/fileUpload');
const serverPath = require('../middlewares/serverPath')
const checkImgSize = require('../middlewares/checkImageSize')
const checkImgMimetype = require('../middlewares/checkImgMimetype')
const router = express.Router();

router.post("/upload",fileUpload(),checkImgSize,checkImgMimetype,serverPath,imageUpload);

module.exports = router;