const Brand = require('../../models/Brand')


const brandDropdown = async(req,res,next)=>{
    try {
        const list = await Brand.find().select('title image').sort({_id:-1})
        res.status(200).json({message: 'success', status: true, list});
        } catch (error) {
            next(error);
            }
            }
            module.exports = brandDropdown;