const Product = require('../../models/product')




const getProducts = async(req,res,next)=>{

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



    ]);


    res.status(200).json({message:'success',status:true,list})


 }catch(error){
next(error)


 }



}

module.exports = getProducts;