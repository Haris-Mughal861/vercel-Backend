const Brand = require ('../../models/Brand')


const updateBrand = async (req,res,next)=>{
    const brandId = req.query.brandId
    const {title,image} = req.body;
    try {
        const findedBrand = await Brand.findById(brandId);
        if(!findedBrand) {
            const error = new Error('invalid brand id');
            error.statusCode = 400;
            throw error;
}

const isExist = await Brand.findOne({title:title})



findedBrand.title = isExist ? isExist.title === title ? findedBrand.title:title:title;
findedBrand.image = image;
await findedBrand.save();
res.status(200).json({message:'brand updated successfully',status: true,
    findedBrand,
});
} catch (error) {
    next(error);
    }
    }
    module.exports = updateBrand;