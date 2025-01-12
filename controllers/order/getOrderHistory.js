const Order = require ('../../models/Order')

const getOrderHistory = async (req,res,next)=>{
    const userId = req.userId
    try{
        const list = await Order.find({user:userId})
        res.status(200).json({message:"success",status: true, list})


    }catch(error){
        next(error)
    }
};
module.exports = getOrderHistory;