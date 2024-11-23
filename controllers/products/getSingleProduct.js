const Product = require('../../models/product')

const getSingleProduct = async(req,res,next)=>{
    const productid = req.query.productId
    try{
        const product = await Product.findOne(productid);
        res.status(200).json({message:"success",status: true, findedProduct});
        }catch(error){
            next(error);
            }

}

module.exports = getSingleProduct;