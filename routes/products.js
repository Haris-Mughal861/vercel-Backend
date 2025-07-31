const express = require('express');
const getProducts = require('../controllers/products/getProducts');
const addProduct = require('../controllers/products/addProduct');
const deleteProduct = require('../controllers/products/deleteProduct');
const getSingleProduct = require('../controllers/products/getSingleProduct');
const getProductByCat = require('../controllers/products/getProductByCat');
const getProductByBrand = require('../controllers/products/getProductByBrand');
const updateProduct = require('../controllers/products/updateProduct');
const isAuth = require("../middlewares/isAuth");
const searchProducts = require('../controllers/products/searchProducts');
const rateProduct = require('../controllers/products/rateProduct');
const fileUpload = require("../middlewares/fileUpload");
const recommendProduct = require('../controllers/products/recommendProduct');

const router = express.Router();
router.get('/recommendations/:productId', recommendProduct);

router.post('/add', isAuth, fileUpload.array('image', 10), addProduct);


router.get('/get', getProducts);


router.get('/single', getSingleProduct);


router.get('/get/:id', async (req, res, next) => {
  const Product = require('../models/Product');

  try {
    const product = await Product.findById(req.params.id)
      .populate([
        { path: 'category', select: '-products -__v' },
        { path: 'brand', select: '-products -__v' },
        {
          path: 'review',
          populate: { path: 'user', select: 'name' }
        },
        { path: 'seller', select: 'status' }
      ]);

    if (!product || product.seller?.status === 'Blocked') {
      return res.status(404).json({ message: 'Product not found', status: false });
    }

    res.status(200).json({ message: 'success', status: true, product });

  } catch (err) {
    next(err);
  }
});


router.delete('/delete/:productId', isAuth, deleteProduct);


router.get('/get/category', getProductByCat);


router.get('/get/brand', getProductByBrand);


router.put('/update', updateProduct);


router.get('/search', searchProducts);


router.post('/rate', isAuth, rateProduct);


router.get('/by-category/:id', async (req, res, next) => {
  const Product = require('../models/Product');

  try {
    const list = await Product.find({ category: req.params.id }).populate([
      {
        path: 'category',
        select: '-products -__v'
      },
      {
        path: 'brand',
        select: '-products -__v'
      }
    ]);

    if (!list.length) {
      return res.status(404).json({ message: 'No products found in this category', status: false });
    }

    res.status(200).json({ message: 'success', status: true, list });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
