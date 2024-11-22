const Category = require('../../models/Category')



const addCategory = async(req,res,next)=>{
    const {title,image} = req.body

try{

if(!title || title.trim().length < 2){
    const error = new Error ('invalid category name')
    error.status = 400
    throw error
}

    const findedCategory = await Category.findOne({title:title})
    if(findedCategory){
        const error = new Error('this category is already exist')
        error.status = 400
        throw error
}

const newCategory = new Category({
    title:title,
    image:image

})

const savedCategory = await newCategory.save()
res.status(201).json({
    message:'category added successfully',
    status: true,
    data:savedCategory
})


}catch (error){
    next(error);

}}

module.exports = addCategory;