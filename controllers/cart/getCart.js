const Cart = require('../../models/Cart')

const getCart = async(req,res,next)=>{
    const userId = req.userId
    try{
        const findedCart = await Cart.find({user:userId}).populate([
            {
                path:'product',
                select:'title image sale_price'
            },
        ]);
        const grandTotal = findedCart.reduce((acc,curr)=>{
            return acc += curr.cartTotal
        },0)
        res.status(200).json({message:'success',status:true,cart:findedCart,grandTotal})
    }catch(error){
        next(error)
    }
}
module.exports = getCart;