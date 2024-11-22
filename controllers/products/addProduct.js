const Product = require('../../models/product');
const joi = require('joi');
const Category = require('../../models/Category');
const Brand = require('../../models/Brand');



const addProduct = async(req,res,next)=>{

const {error:ValidationError} = validateProduct(req.body)


    const {title,
        sale_price,
        category,
        stock,
        brand,
        image,
        details,
        purchase_price,
    } = req.body;

    try{

        if(ValidationError){
            const error = new error (ValidationError.details[0].message);
            error.statusCode = 400;
            throw error;
        }

      const findedProduct = await Product.findOne({title:title})


      if(findedProduct){
        const error = new Error('this product name already exist');
        error.statusCode = 400;
        throw error;
      }

        const newProduct = new product({
            title,
            sale_price,
            category,
            stock,
            brand,
            image,
            details,
            purchase_price,
            });

            const savedProduct = await newProduct.save();

            await Brand.findByIdAndUpdate(brand,{$push:{products:savedProduct._id},
            });

            await Category.findByIdAndUpdate(category,{
                $push:{products:savedProduct._id},
            });




            res.status(200).json({message:'product added successfully', product:saved})




    }catch(error){
        next(error);
    }

}

module.exports = addProduct;


function validateProduct(data){

    const productSchema = joi.object({
        title:joi.string().required(),
        sale_price:joi.number().required(),
        category:joi.string().required(),
        stock:joi.number().required(),
        brand:joi.string().required(),
        image:joi.string().required(),
        details:joi.string().required(),
        purchase_price:joi.number().required(),

    });

    return productSchema.validate(data)



}