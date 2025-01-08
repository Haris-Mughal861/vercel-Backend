const Cart = require('../../models/Cart')

const deleteCart = async(req,res,next)=>{
    const cartId = req.query.cartId;


    try{
        await Cart.findByIdAndDelete(cartId);
        res.status(200).json({message: "Cart deleted successfully", status: true});
    }catch(error){
        next(error);
    }
};
module.exports = deleteCart;