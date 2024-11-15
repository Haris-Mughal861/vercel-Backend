const mongoose = require('mongoose')

const galarySchema = new mongoose.Schema({

    image:{type:String}

},{timestamps:true});

module.exports = mongoose.model("Galary",galarySchema);