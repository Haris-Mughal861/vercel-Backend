const Product = require('../../models/product')


const updateProduct = async(req,res,next)=>{
    const productId = req.query.productId
    const {
        title,
        brand,
        category,
        sale_price,
        stock,
        detail,
        image,
        purchase_price,

    }=req.body
    try{
        const findedProduct = await Product.findById(productId)
        if(!findedProduct){
            const error = new Error('invalid product id')
            error.status = 400
            throw error;
            }

            const isExist = await Product.findOne({title:title})
            findedProduct.title = isExist ? isExist.title === title ? findedProduct.title :title:title;


            findedProduct.title = title;
            findedProduct.brand = brand;
            findedProduct.category = category;
            findedProduct.sale_price = sale_price;
            findedProduct.stock = stock;
            findedProduct.detail = detail;
            findedProduct.image = image;
            findedProduct.purchase_price = purchase_price;
            await findedProduct.save();

            await Brand.findOneAndUpdate({products:productId},{$pull:{products:productId}})
           await Brand.findByIdAndUpdate(brand,{$push:{products:productId}})

           await Category.findOneAndUpdate({products:productId},{$pull:{products:productId}})
           await Category.findByIdAndUpdate(category,{$push:{products:productId}})

            

            res.status(200).json({message:'product updated successfully',status:true,findedProduct})


            }catch(error){
                next(error)
                }
                };
                module.exports = updateProduct;



