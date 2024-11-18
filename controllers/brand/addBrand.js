const Brand = require('../../models/Brand'); 

const addBrand = async (req, res, next) => {
    const { title, image } = req.body; 

    try {

        if(!title || title.trim().length < 2){
            const error = new Error('invalid brand name')
            error.status = 400
            throw error
        }
        
        const findedBrand = await Brand.findOne({ title: title });
        if (findedBrand) {
            return res.status(400).json({ message: "Brand already exists" });
        }

        
        const newBrand = new Brand({
            title: title,
            image: image,
        });

        
        const savedBrand = await newBrand.save();
        res.status(201).json({ message: "Brand created successfully", savedBrand });
    } catch (error) {
        next(error); 
    }
};

module.exports = addBrand;

