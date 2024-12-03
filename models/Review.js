const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    rating:{type:Number},
    review:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
    image:[{type:String}],
},{timestamps:true});
module.exports = mongoose.model('Review', reviewSchema);