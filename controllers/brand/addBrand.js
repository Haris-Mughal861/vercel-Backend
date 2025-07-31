const Brand = require('../../models/Brand');

const addBrand = async (req, res, next) => {
    const { title } = req.body;
    const image = req.file ? req.file.filename : null; 

    try {
        if (!title || title.trim().length < 2) {
            const error = new Error('invalid brand name');
            error.status = 400;
            throw error;
        }

        const findedBrand = await Brand.findOne({ title: title.trim() });
        if (findedBrand) {
            return res.status(400).json({ message: "Brand already exists" });
        }

        const newBrand = new Brand({
            title: title.trim(),
            image: image || '', 
        });

        const savedBrand = await newBrand.save();
        res.status(201).json({ message: "Brand created successfully", savedBrand, status: true });
    } catch (error) {
        next(error);
    }
};

module.exports = addBrand;


