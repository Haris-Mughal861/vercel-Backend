const express = require('express')
const addCategory = require("../controllers/category/addCategory");

const router = express.Router();

router.post("/add",addCategory);

module.exports= router;