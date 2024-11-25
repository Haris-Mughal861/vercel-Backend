const Product = require('../../models/product')
const Brand = require('../../models/Brand')
const Category = require('../../models/Category')


const deleteProduct = async(req,res,next)=>{
    const productId = req.query.productId;



    try{


        await Product.findByIdAndDelete(productId);
        await Category.findOneAndUpdate({Products:productId},{$pull:{Products:productId}})
        await Brand.findOneAndUpdate({Products:productId},{$pull:{Products:productId}})
        res
        .status(200)
        .json({message:'Product deleted successfully',staus: true});



    }catch(error){
        next(error)

    }
};

module.exports = deleteProduct;