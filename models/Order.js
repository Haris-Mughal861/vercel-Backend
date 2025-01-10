const mongoose = require ('mongoose')

const orderSchema = new mongoose.Schema({
    product:[{type:Object}],
    user: [{type:mongoose.Types.ObjectId,ref:'User'}],
    orderTotal:{type:Number},
    status:{type:String,default:'processing'}
},
{
    timestamps:true
    });
    module.exports = mongoose.model('Order', orderSchema);


 
