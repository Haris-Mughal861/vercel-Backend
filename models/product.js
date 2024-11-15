const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    title:{type:String},
    sales_price:{type:Number},
    purchase_price:{type:Number},
    details:{type:String},
    stock:{type:Number},
    category:{type:mongoose.Types.ObjectId,ref:'Category'},
    brand:{type: mongoose.Types.ObjectId,ref:'Brand'},
    Image:[{type:String}],
    is_active:{type:Boolean,default:true}
},{timestamps:true})

module.exports= mongoose.model('Product',productSchema)