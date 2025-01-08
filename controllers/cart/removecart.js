const Cart = require('../../models/Cart')


const removecart = async (req,res,next)=>
{
    const productId = req.query.productId

    try{
         const findedCart = await Cart.findOne({user:userId,product:productId}).populate([
            {
                path: 'product',

            }
         ]);
         if(findedCart.quantity >1){
            findedCart.quantity--
            findedCart.cartTotal = findedCart.product.sale_price;
         }else{
            await Cart.findOneAndDelete({user:req.userId,product: productId});
         }
         res.status(200).json({message:'item removed from cart',status:true})

    }catch (error){
        next(error)
    }
}
module.exports = removecart;