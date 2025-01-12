const Order = require ('../../models/Order')

const getAllOrders = async(req,res,next)=>{
    const pageNum = req.query.pageNum
    const pageLimit = 2




    try{
        const list = await Order.find().sort({_id: -1}).skip((pageNum-1)*pageLimit).limit(pageLimit);
        res.status(200).json({message: 'success', status: true, list})
        }catch(error){
            next(error)
}}
module.exports = getAllOrders;