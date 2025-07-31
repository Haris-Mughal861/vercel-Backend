const Product = require("../../models/Product");
const joi = require("joi");
const Category = require("../../models/Category");
const Brand = require("../../models/Brand");

const addProduct = async (req, res, next) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILES:", req.files);

    const { error: validationError } = validateProduct(req.body);
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const {
      title,
      sale_price,
      purchase_price,
      stock,
      detail,
      category,
      brand,
      sizes,
      colors,
    } = req.body;

    const numericSalePrice = Number(sale_price);
    const numericPurchasePrice = Number(purchase_price);

    if (isNaN(numericSalePrice) || isNaN(numericPurchasePrice)) {
      const error = new Error("Sale or Purchase price must be a valid number");
      error.statusCode = 400;
      throw error;
    }

    const image = req.files?.map((file) => file.filename);
    if (!image || image.length === 0) {
      const error = new Error("Image is required");
      error.statusCode = 400;
      throw error;
    }

    //const existingProduct = await Product.findOne({ title });
    //if (existingProduct) {
    //  const error = new Error("This product name already exists");
     // error.statusCode = 400;
     // throw error;
   // }

    const foundBrand = await Brand.findOne({ title: brand }).select("_id");
    const foundCategory = await Category.findOne({ title: category }).select("_id");

    if (!foundBrand || !foundCategory) {
      const error = new Error("Brand or Category not found");
      error.statusCode = 400;
      throw error;
    }

    
    const parsedSizes = sizes ? sizes.split(",").map((s) => s.trim()) : [];

    
    let parsedColors = [];
    if (colors && typeof colors === "string") {
      parsedColors = colors.split(",").map((c) => c.trim());
    }

    const newProduct = new Product({
      title,
      sale_price: numericSalePrice,
      purchase_price: numericPurchasePrice,
      detail,
      stock,
      brand: foundBrand._id,
      category: foundCategory._id,
      image,
      seller: req.user?._id || null,
      sizes: parsedSizes,
      colors: parsedColors,
    });

    console.log("Product to save:", newProduct);

    const savedProduct = await newProduct.save();

    await Brand.findByIdAndUpdate(foundBrand._id, {
      $push: { products: savedProduct._id },
    });
    await Category.findByIdAndUpdate(foundCategory._id, {
      $push: { products: savedProduct._id },
    });

    res.status(200).json({
      message: "Product added successfully",
      product: savedProduct,
      status: true,
    });
  } catch (error) {
    console.error("Add Product Error:", error.message);
    next(error);
  }
};

module.exports = addProduct;


function validateProduct(data) {
  const productSchema = joi.object({
    title: joi.string().required(),
    sale_price: joi.number().required(),
    purchase_price: joi.number().required(),
    detail: joi.string().required(),
    stock: joi.number().required(),
    brand: joi.string().required(),
    category: joi.string().required(),
    sizes: joi.string().allow(""), 
    colors: joi.string().allow("") 
  });

  return productSchema.validate(data);
}
