const express = require('express');
const router = express.Router();
const fileUpload = require('../middlewares/fileUpload'); 
const checkImgSize = require('../middlewares/checkImageSize');
const checkImgMimetype = require('../middlewares/checkImgMimetype');
const serverPath = require('../middlewares/serverPath');
const imageUpload = require('../controllers/galary/uploadImage');

router.post(
  "/upload",
  fileUpload.array('image', 10),  
  checkImgSize,
  checkImgMimetype,
  serverPath,
  imageUpload
);

module.exports = router;
