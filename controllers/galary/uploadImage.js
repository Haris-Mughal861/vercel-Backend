const Galary = require('../../models/Galary');

const uploadImage = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded', status: false });
        }

        const savedImages = [];

        for (let file of req.files) {
            const newImage = new Galary({
                image: file.path,
            });

            const savedImage = await newImage.save();
            savedImages.push(req.domain + savedImage.image);
        }

        res.status(201).json({
            message: 'Images uploaded successfully',
            status: true,
            images: savedImages,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = uploadImage;
