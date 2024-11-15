const Galary = require('../../models/Galary')

const uploadImage = async(req,res,next)=>{
    try{
        const newImage = Galary({
            image:req.file.path
        })
        const savedImage= await newImage.save()
        res.status(201).json({message:'image uploded successfuly',
            status:true,
            image:req.domain + savedImage.image});
}catch(error){
    next(error)
}};

module.exports= uploadImage;