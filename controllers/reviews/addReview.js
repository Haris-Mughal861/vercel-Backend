const Review = require('../../models/Review');
const Product = require('../../models/product')

const addReview = async(req,res,next)=>{
    const productId = req.query.productId
    const {rating,review,image}= req.body
    try{
        const newReview = new Review({
            rating,
            review,
            image,
            product:productId,
            user:req.userId

        })
        const savesReview = await newReview.save();
        await Product.findByIdAndUpdate(productId,{$push:{review:savedReview._id}})
        res.status(200).json({message:"Review Added Successfully", status:true})
    }catch(error){
        next(error)
    }
}
module.exports = addReview;