const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    title:{type:String},
    product:[{type:mongoose.Types.ObjectId,ref:"Product"}],
    image:{type:String},


},{timestamps:true});

module.exports = mongoose.model("Category",categorySchema);