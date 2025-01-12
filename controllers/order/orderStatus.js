const Order = require('../../models/Order')

const orderStatus = async(req,res,next)=>{
    const {status}= req.body
    const orderId = req.query.orderId
    try{
        const findedOrder  = await Order.findById(orderId)
        if(!findedOrder){
            const error = new Error('invalid order id')
            error.statusCode = 400
            throw error
            }
            if(
                findedOrder.status === 'dilivered'
            ){
                const error = new Error('Can not change order Status')
                error.statusCode = 400
                throw error;
            }
            findedOrder.status = status
            await findedOrder.save()
            res.status(200).json({message:'order status updated successfully',status:true})


    }catch (error){
        next(error)
    }
};
module.exports = orderStatus;