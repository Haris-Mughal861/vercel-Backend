const Product = require('../../models/product')


const getProductByCat = async(req,res,next)=>{
    const category = req.query.category

    try{
        const list = await Product.find({category:category}).populate([
            {
                path: 'category',
                select: '-products -__v'
            },
            {
                path: 'brand',
                select: '-products -__v'
            }



        ])
        res.status(200).json({message:'success',status:true,list})

    }catch(error){
        next(error)
    }
}
module.exports = getProductByCat;