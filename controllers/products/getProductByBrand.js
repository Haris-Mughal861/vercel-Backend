const Product = require('../../models/product')


const getProductByBrand = async(req,res,next)=>{
    const brand = req.query.brand
    try{
        const list = await Product.find({brand:brand}).populate([
            {
                path:'category',
                select:'-products -__v',
            },
            {
                path:'brand',
                select:'-products -__v',

            }
        ])
        res.status(200).json({message:"success",status: true, list,count:list.length});
        }catch(error){
            next(error);

}}
module.exports = getProductByBrand;