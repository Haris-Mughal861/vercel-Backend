const Product = require("../../models/Product");
const joi = require("joi");
const Category = require("../../models/Category");
const Brand = require("../../models/Brand");
const cloudinary = require("../../utils/cloudinary");

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

    if (!req.files || req.files.length === 0) {
      const error = new Error("Image is required");
      error.statusCode = 400;
      throw error;
    }

    const hasCloudinaryConfig =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET;

    if (!hasCloudinaryConfig) {
      const error = new Error(
        "Cloudinary configuration missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
      );
      error.statusCode = 500;
      throw error;
    }

    // Upload to Cloudinary
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'products' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        uploadStream.end(file.buffer);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);

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
      image: imageUrls,
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
    if (error?.message?.includes("Must supply api_key")) {
      error.statusCode = 500;
      error.message =
        "Cloudinary API key missing on server. Please configure CLOUDINARY_API_KEY in deployment environment variables.";
    }
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
