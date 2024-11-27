const Category = require('../../models/Category')


const updateCategory = async (req,res,next)=>{
    const category = req.query.category
    const {title,image}= req.body

    try{
        const findedCat = await Category.findById(category)
        if(!findedCat){
            return res.status(404).json({message:'Category not found'})
            }

            const isExist = await Category.findOne({title:title})



            findedCat.title = isExist.title === title ? findedCat.title:title
            findedCat.image = image
            await findedCat.save()
            res.json({message:'Category updated successfully'})


    }catch(error){

        next(error)

    }
}