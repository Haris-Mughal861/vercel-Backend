const Cart = require('../../models/Cart');
const Product = require('../../models/Product');
const addToCart = async(req,res,next)=>{
const productId = req.query.productId
const userId = req.userId

    try{
        const findedCart = await Cart.findOne({user:userId,product:productId})
        const findedProduct = await Product.findById(productId)
        if(findedCart){
            findedCart.quantity ++
            findedCart.cartTotal+=findedCart.product.sale_price
            await findedCart.save();
        }else{
            const newCart = new Cart({
                user:userId,
                product:productId,
                quantity:1,
                cartTotal: findedProduct.sale_price,
                })
                await newCart.save();


        }
        res.status(200).json({message:'item added to cart',status:true})




    }catch(error){
        next(error);
    }


}
module.exports = addToCart;