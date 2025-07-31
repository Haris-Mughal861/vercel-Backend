const Seller = require('../../models/Seller');
const Product = require('../../models/Product');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');


const registerSeller = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ status: false, message: 'Email already registered' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      name,
      email,
      password: hashedPassword,
      isApproved: true, 
    });

    await newSeller.save();

    const token = generateToken(newSeller._id);

    res.status(201).json({
      status: true,
      message: 'Seller registered successfully',
      token,
      seller: {
        id: newSeller._id,
        name: newSeller.name,
        email: newSeller.email,
      },
    });
  } catch (err) {
    next(err);
  }
};


const getSellerDashboard = async (req, res, next) => {
  try {
    const sellerId = req.user._id;
    const products = await Product.find({ seller: sellerId }).populate('brand category');

    
    console.log("DANGER DANGER: ",products);
    res.json({ status: true, products });
  } catch (err) {
    next(err);
  }
};


const addProductBySeller = async (req, res, next) => {
  try {
    const {
      title,
      brand,
      category,
      purchase_price,
      sale_price,
      stock,
      detail, 
    } = req.body;

    const image = req.files?.map((file) => file.filename) || [];

    const newProduct = new Product({
      title,
      brand,
      category,
      purchase_price,
      sale_price,
      stock,
      detail, 
      image,
      seller: req.user._id,
    });

    await newProduct.save();

    res.status(201).json({ status: true, message: 'Product added successfully' });
  } catch (err) {
    next(err);
  }
};



module.exports = {
  registerSeller,
  getSellerDashboard,
  addProductBySeller,
};

