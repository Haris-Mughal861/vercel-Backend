const Product = require('../../models/product')




const getProducts = async(req,res,next)=>{
    const pageNum = req.query.page
    const pageLimit = 2

 try{

    const list = await Product.find().populate([

        {
            path:'category',
            select:'-products -__v'
            
        },
        {
            path:'brand',
            select:'-products -__v'

        },



    ]).skip((pageNum-1)*pageLimit)
    .limit(pageLimit)
    .sort({_id: -1});


    res.status(200).json({message:'success',status:true,list})


 }catch(error){
next(error)


 }



}

module.exports = getProducts;