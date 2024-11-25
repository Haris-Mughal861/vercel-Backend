const Product = require('../../models/product')

const getSingleProduct = async(req,res,next)=>{
    const productid = req.query.productId
    try{
        const product = await Product.findOne(productid).populate([
            {
                path: 'category',
                select: '-products -__v',

            },

            {
                path: 'brand',
                select: '-products -__v',
            },

        ]);
        res.status(200).json({message:"success",status: true, findedProduct});
        }catch(error){
            next(error);
            }
        
        };

module.exports = getSingleProduct;